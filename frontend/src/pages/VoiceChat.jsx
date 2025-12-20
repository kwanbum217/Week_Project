import { useState, useEffect, useRef } from 'react';
import { Box, Button, VStack, Heading, Text, HStack } from '@chakra-ui/react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const VoiceChat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState('Idle');
  const user = JSON.parse(localStorage.getItem('user'));

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  useEffect(() => {
    const socket = new SockJS('http://localhost:9999/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/signal', async (payload) => {
        const message = JSON.parse(payload.body);
        if (message.sender === user.username) return; // Ignore own messages

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
      if (client) client.disconnect();
    };
  }, [user.username]);

  const startCall = async () => {
    setIsCalling(true);
    setStatus('Calling...');

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    // localVideoRef.current.srcObject = stream; // For video

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
  };

  const handleOffer = async (message) => {
    setStatus('Incoming Call...');
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
    setStatus('Connected');
  };

  const handleAnswer = async (message) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.data));
    setStatus('Connected');
  };

  const handleCandidate = async (message) => {
    if (peerConnection.current) {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(message.data));
    }
  };

  const sendSignal = (type, data) => {
    if (stompClient) {
      const signalMessage = {
        type: type,
        sender: user.username,
        data: data
      };
      stompClient.send("/app/signal", {}, JSON.stringify(signalMessage));
    }
  };

  return (
    <Box p={8} textAlign="center">
      <Heading mb={4}>Voice Chat</Heading>
      <Text mb={4}>Status: {status}</Text>

      <HStack justify="center" spacing={4}>
        <Button colorScheme="green" onClick={startCall} isDisabled={isCalling}>
          Start Call
        </Button>
        <Button colorScheme="red" onClick={() => window.location.reload()}>
          End Call
        </Button>
      </HStack>

      <Box mt={8}>
        {/* Hidden video elements for audio stream */}
        <audio ref={localVideoRef} autoPlay muted />
        <audio ref={remoteVideoRef} autoPlay />
      </Box>
    </Box>
  );
};

export default VoiceChat;
