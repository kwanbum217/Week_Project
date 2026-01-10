import { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  Avatar,
  Badge,
  Heading,
  Flex,
  Button,
  Popover
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

const Chat = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const socket = new SockJS('/ws-chat?token=' + token);
    const client = over(socket);

    client.connect({}, () => {
      // Subscribe to public chat or specific room
      const topic = roomId ? `/topic/chat/${roomId}` : '/topic/public';
      client.subscribe(topic, (msg) => {
        const payload = JSON.parse(msg.body);
        setMessages((prev) => [...prev, payload]);
      });
    }, (err) => {
      console.error('WebSocket connection error:', err);
    });

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [roomId, navigate]);

  const sendMessage = () => {
    if (stompClient && inputValue) {
      const message = {
        content: inputValue,
        sender: 'Me', // Should be derived from token/user info
        type: 'CHAT'
      };

      if (roomId) {
        stompClient.send(`/app/chat.send/${roomId}`, {}, JSON.stringify(message));
      } else {
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
      }
      setInputValue('');
    }
  };

  // Extract unique participants from messages
  // We need to store both name and id.
  // Map: name -> id (last seen id for that name)
  const participantMap = new Map();
  messages.forEach(msg => {
    if (msg.sender && msg.sender !== 'Me' && msg.sender !== '나') {
      participantMap.set(msg.sender, msg.senderId);
    }
  });

  const participants = Array.from(participantMap, ([name, id]) => ({ name, id }));

  // Add 'Me' manually if not present (though 'Me' usually doesn't need a menu)
  if (!participants.some(p => p.name === '나')) {
    participants.unshift({ name: '나', id: null });
  }

  const handlePrivateChat = async (targetUserId) => {
    if (!targetUserId) {
      alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/chat/request?toUserId=${targetUserId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const room = await response.json();
        navigate(`/chat/${room.id}`);
      } else {
        console.error("Failed to create private chat");
        alert("1:1 채팅방 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error creating private chat:", error);
    }
  };

  const handleVoiceChat = (targetUserId) => {
    alert("보이스톡 기능은 준비 중입니다.");
  };

  return (
    <Flex direction="column" minH="100vh" bg="transparent">
      <Box maxW="1400px" mx="auto" px={4} py={8} flex="1" w="full">
        <Flex gap={6} h="calc(100vh - 200px)" direction={{ base: 'column', md: 'row' }}>

          {/* Main Chat Area */}
          <Box
            flex="3"
            bg="rgba(255, 255, 255, 0.8)"
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            boxShadow="xl"
            display="flex"
            flexDirection="column"
            overflow="hidden"
            border="1px solid rgba(255, 255, 255, 0.3)"
          >
            {/* Header */}
            <Box p={4} borderBottom="1px solid rgba(0,0,0,0.05)" bg="rgba(255,255,255,0.5)">
              <Heading size="md" color="var(--mooa-navy)">
                {roomId ? `채팅방: ${roomId}` : '오픈 채팅방'}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                즐거운 대화를 나눠보세요
              </Text>
            </Box>

            {/* Messages */}
            <Box flex="1" p={4} overflowY="auto" css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { width: '6px' },
              '&::-webkit-scrollbar-thumb': { background: 'gray.200', borderRadius: '24px' },
            }}>
              <VStack spacing={4} align="stretch">
                {messages.map((msg, idx) => {
                  const isMe = msg.sender === 'Me' || msg.sender === '나'; // Adjust based on actual sender logic
                  return (
                    <Flex key={idx} justify={isMe ? 'flex-end' : 'flex-start'}>
                      {!isMe && (
                        <Avatar size="sm" name={msg.sender} mr={2} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender}`} />
                      )}
                      <Box
                        maxW="70%"
                        bg={isMe ? 'var(--mooa-orange)' : 'white'}
                        color={isMe ? 'white' : 'gray.800'}
                        px={4}
                        py={2}
                        borderRadius="2xl"
                        borderTopLeftRadius={!isMe ? '0' : '2xl'}
                        borderTopRightRadius={isMe ? '0' : '2xl'}
                        boxShadow="sm"
                      >
                        {!isMe && <Text fontSize="xs" fontWeight="bold" mb={1} color="gray.500">{msg.sender}</Text>}
                        <Text>{msg.content}</Text>
                      </Box>
                    </Flex>
                  );
                })}
                <div ref={messagesEndRef} />
              </VStack>
            </Box>

            {/* Input Area */}
            <Box p={4} bg="white" borderTop="1px solid rgba(0,0,0,0.05)">
              <HStack spacing={2}>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  borderRadius="full"
                  bg="gray.50"
                  border="none"
                  _focus={{ ring: 2, ringColor: 'var(--mooa-orange)' }}
                  h="50px"
                  px={6}
                />
                <IconButton
                  icon={<span style={{ fontSize: '20px' }}>➤</span>}
                  onClick={sendMessage}
                  colorScheme="orange"
                  bg="var(--mooa-orange)"
                  isRound
                  size="lg"
                  aria-label="Send message"
                  _hover={{ transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                />
              </HStack>
            </Box>
          </Box>

          {/* Participants Sidebar */}
          <Box
            flex="1"
            bg="rgba(255, 255, 255, 0.6)"
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            boxShadow="lg"
            p={5}
            border="1px solid rgba(255, 255, 255, 0.3)"
            h="full"
            overflowY="auto"
          >
            <VStack align="stretch" spacing={4}>
              <Flex align="center" justify="space-between" mb={2}>
                <Heading size="sm" color="var(--mooa-navy)">참가자</Heading>
                <Badge colorScheme="green" borderRadius="full" px={2}>
                  {participants.length}명
                </Badge>
              </Flex>

              <VStack align="stretch" spacing={3}>
                {participants.map((participant, idx) => (
                  <Popover.Root key={idx} placement="left" trigger="click">
                    <Popover.Trigger>
                      <HStack
                        p={2}
                        borderRadius="lg"
                        _hover={{ bg: 'whiteAlpha.500', cursor: 'pointer' }}
                        transition="all 0.2s"
                      >
                        <Text fontWeight="medium" fontSize="sm" color="gray.700">
                          {participant.name}
                        </Text>
                        {participant.name === '나' && (
                          <Badge ml="auto" fontSize="xs" colorScheme="orange">ME</Badge>
                        )}
                      </HStack>
                    </Popover.Trigger>
                    {participant.name !== '나' && (
                      <Popover.Content w="200px">
                        <Popover.Arrow />
                        <Popover.Body p={2}>
                          <VStack align="stretch" spacing={1}>
                            <Button size="sm" variant="ghost" onClick={() => handlePrivateChat(participant.id)}>
                              1:1 채팅하기
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleVoiceChat(participant.id)}>
                              보이스톡
                            </Button>
                          </VStack>
                        </Popover.Body>
                      </Popover.Content>
                    )}
                  </Popover.Root>
                ))}
              </VStack>
            </VStack>
          </Box>

        </Flex>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Chat;
