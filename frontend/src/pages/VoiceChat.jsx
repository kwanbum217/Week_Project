import { useState, useEffect, useRef } from 'react';
import { Box, Button, VStack, Heading, Text, HStack } from '@chakra-ui/react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const VoiceChat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState('대기 중');
  const user = JSON.parse(localStorage.getItem('user'));

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  useEffect(() => {
    const socket = new SockJS('/ws');
    const client = Stomp.over(socket);
    client.debug = null; // 디버그 로그 비활성화

    client.connect({}, () => {
      client.subscribe('/topic/signal', async (payload) => {
        const message = JSON.parse(payload.body);
        if (message.sender === user.username) return;

        if (message.type === 'offer') {
          await handleOffer(message);
        } else if (message.type === 'answer') {
          await handleAnswer(message);
        } else if (message.type === 'candidate') {
          await handleCandidate(message);
        }
      });
    });

    setStompClient(client);

    return () => {
      if (client && client.connected) client.disconnect();
    };
  }, [user?.username]);

  const startCall = async () => {
    setIsCalling(true);
    setStatus('연결 중...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      peerConnection.current = new RTCPeerConnection(configuration);
      stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendSignal('candidate', event.candidate);
        }
      };

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      sendSignal('offer', offer);
    } catch (error) {
      console.error('마이크 접근 오류:', error);
      if (error.name === 'NotFoundError') {
        setStatus('마이크를 찾을 수 없습니다');
        alert('마이크가 연결되어 있는지 확인해주세요.');
      } else if (error.name === 'NotAllowedError') {
        setStatus('마이크 권한이 거부됨');
        alert('브라우저에서 마이크 권한을 허용해주세요.');
      } else {
        setStatus('오류 발생');
        alert('음성통화 시작 중 오류가 발생했습니다: ' + error.message);
      }
      setIsCalling(false);
    }
  };

  const handleOffer = async (message) => {
    setStatus('수신 통화...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      peerConnection.current = new RTCPeerConnection(configuration);
      stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendSignal('candidate', event.candidate);
        }
      };

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.data));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      sendSignal('answer', answer);
      setStatus('통화 중');
    } catch (error) {
      console.error('통화 수락 오류:', error);
      setStatus('오류 발생');
    }
  };

  const handleAnswer = async (message) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.data));
    setStatus('통화 중');
  };

  const handleCandidate = async (message) => {
    if (peerConnection.current) {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(message.data));
    }
  };

  const sendSignal = (type, data) => {
    if (stompClient && stompClient.connected) {
      const signalMessage = {
        type: type,
        sender: user.username,
        data: data
      };
      stompClient.send("/app/signal", {}, JSON.stringify(signalMessage));
    }
  };

  return (
    <Box p={8} textAlign="center" className="mooa-glass-card" maxW="600px" mx="auto" mt={10}>
      <Heading mb={4} color="var(--mooa-navy)">🎧 음성 통화</Heading>
      <Text mb={4} fontSize="lg">상태: <strong>{status}</strong></Text>

      <HStack justify="center" spacing={4}>
        <Button
          className="mooa-btn-primary"
          onClick={startCall}
          isDisabled={isCalling}
        >
          📞 통화 시작
        </Button>
        <Button
          className="mooa-btn-secondary"
          onClick={() => window.location.reload()}
        >
          ❌ 통화 종료
        </Button>
      </HStack>

      <Box mt={8}>
        <audio ref={localVideoRef} autoPlay muted />
        <audio ref={remoteVideoRef} autoPlay />
      </Box>
    </Box>
  );
};

export default VoiceChat;
