import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const VoiceCall = ({ currentUser, targetUser }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState('대기 중'); // 대기 중, 연결 중, 통화 중, 종료됨
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const peerConnectionRef = useRef(null);

  // WebRTC 설정 (Google STUN 서버 사용)
  const peerConnectionConfig = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  };

  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new SockJS('/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log('WebSocket Connected');
      setIsConnected(true);

      // 시그널링 구독
      client.subscribe('/topic/call/offer', (message) => {
        const offer = JSON.parse(message.body);
        if (offer.target === currentUser.username) {
          handleReceiveOffer(offer);
        }
      });

      client.subscribe('/topic/call/answer', (message) => {
        const answer = JSON.parse(message.body);
        if (answer.target === currentUser.username) {
          handleReceiveAnswer(answer);
        }
      });

      client.subscribe('/topic/call/candidate', (message) => {
        const candidate = JSON.parse(message.body);
        if (candidate.target === currentUser.username) {
          handleReceiveCandidate(candidate);
        }
      });
    });

    setStompClient(client);

    return () => {
      if (client && client.connected) client.disconnect();
      if (peerConnectionRef.current) peerConnectionRef.current.close();
    };
  }, [currentUser]);

  const startCall = async () => {
    if (!isConnected || !stompClient) {
      alert('서버와 연결되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setIsCalling(true);
    setCallStatus('연결 중...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (localAudioRef.current) localAudioRef.current.srcObject = stream;

      const pc = new RTCPeerConnection(peerConnectionConfig);
      peerConnectionRef.current = pc;

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          stompClient.send("/app/call/candidate", {}, JSON.stringify({
            target: targetUser,
            sender: currentUser.username,
            candidate: event.candidate
          }));
        }
      };

      pc.ontrack = (event) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = event.streams[0];
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      stompClient.send("/app/call/offer", {}, JSON.stringify({
        target: targetUser,
        sender: currentUser.username,
        offer: offer
      }));

    } catch (error) {
      console.error('Error starting call:', error);
      setCallStatus('오류 발생');
    }
  };

  const handleReceiveOffer = async (data) => {
    if (window.confirm(`${data.sender}님으로부터 음성통화 요청이 왔습니다. 수락하시겠습니까?`)) {
      setIsCalling(true);
      setCallStatus('통화 중');

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (localAudioRef.current) localAudioRef.current.srcObject = stream;

        const pc = new RTCPeerConnection(peerConnectionConfig);
        peerConnectionRef.current = pc;

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            stompClient.send("/app/call/candidate", {}, JSON.stringify({
              target: data.sender,
              sender: currentUser.username,
              candidate: event.candidate
            }));
          }
        };

        pc.ontrack = (event) => {
          if (remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = event.streams[0];
          }
        };

        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        stompClient.send("/app/call/answer", {}, JSON.stringify({
          target: data.sender,
          sender: currentUser.username,
          answer: answer
        }));

      } catch (error) {
        console.error('Error accepting call:', error);
      }
    }
  };

  const handleReceiveAnswer = async (data) => {
    setCallStatus('통화 중');
    const pc = peerConnectionRef.current;
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
  };

  const handleReceiveCandidate = async (data) => {
    const pc = peerConnectionRef.current;
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsCalling(false);
    setCallStatus('종료됨');
    // 스트림 정지 로직 추가 필요
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" className="mooa-glass-card">
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">음성통화</Text>
        <Badge colorScheme={isCalling ? 'green' : 'gray'}>{callStatus}</Badge>

        {!isCalling ? (
          <Button
            colorScheme="orange"
            onClick={startCall}
            className="mooa-btn-primary"
            isDisabled={!isConnected}
          >
            {isConnected ? '통화 시작' : '연결 중...'}
          </Button>
        ) : (
          <Button colorScheme="red" onClick={endCall}>
            통화 종료
          </Button>
        )}

        {/* 오디오 엘리먼트 (화면에 보이지 않게 처리 가능) */}
        <audio ref={localAudioRef} autoPlay muted />
        <audio ref={remoteAudioRef} autoPlay />
      </VStack>
    </Box>
  );
};

export default VoiceCall;
