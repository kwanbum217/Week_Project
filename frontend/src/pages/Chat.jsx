import { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
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
  const [onlineParticipants, setOnlineParticipants] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
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

      // Subscribe to participants list
      client.subscribe('/topic/chat/participants', (msg) => {
        const users = JSON.parse(msg.body);
        // Convert string list to object list for UI compatibility
        setOnlineParticipants(users.map(u => ({ name: u, id: u })));
      });

      // Join notification
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);
      client.send("/app/chat.addUser", {}, JSON.stringify({
        sender: user.username,
        type: 'JOIN'
      }));

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
    if (stompClient && inputValue && currentUser) {
      const message = {
        content: inputValue,
        sender: currentUser.username,
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

  // Use onlineParticipants from server
  const participants = onlineParticipants.map(p => ({
    ...p,
    name: p.name === currentUser?.username ? '나' : p.name
  }));

  // Ensure '나' is at the top
  participants.sort((a, b) => (a.name === '나' ? -1 : b.name === '나' ? 1 : 0));

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
                  const isMe = msg.sender === currentUser?.username;
                  return (
                    <Flex key={idx} justify={isMe ? 'flex-end' : 'flex-start'} mb={2}>
                      {!isMe && (
                        <Box
                          w="40px"
                          h="40px"
                          borderRadius="full"
                          overflow="hidden"
                          mr={3}
                          flexShrink={0}
                          border="2px solid"
                          borderColor="gray.200"
                        >
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender}`}
                            alt={msg.sender}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                      )}
                      <Box maxW="70%">
                        {!isMe && (
                          <Text fontSize="xs" fontWeight="bold" mb={1} color="gray.600" ml={1}>
                            {msg.sender}
                          </Text>
                        )}
                        <Box
                          bg={isMe ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'white'}
                          background={isMe ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'white'}
                          color={isMe ? 'white' : 'gray.800'}
                          px={4}
                          py={3}
                          borderRadius="xl"
                          borderTopLeftRadius={!isMe ? '4px' : 'xl'}
                          borderTopRightRadius={isMe ? '4px' : 'xl'}
                          boxShadow={isMe ? 'md' : 'sm'}
                          border={!isMe ? '1px solid' : 'none'}
                          borderColor="gray.200"
                          position="relative"
                        >
                          <Text fontSize="md" lineHeight="1.5">{msg.content}</Text>
                        </Box>
                        {isMe && (
                          <Text fontSize="2xs" color="gray.400" textAlign="right" mt={1} mr={1}>
                            나
                          </Text>
                        )}
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
                  _focus={{ ring: 2, ringColor: '#25D366' }}
                  h="50px"
                  px={6}
                />
                <IconButton
                  icon={<span style={{ fontSize: '20px' }}>➤</span>}
                  onClick={sendMessage}
                  bg="#25D366"
                  color="white"
                  isRound
                  size="lg"
                  aria-label="Send message"
                  _hover={{ transform: 'scale(1.05)', bg: "#20bd5a" }}
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
                  <Popover.Root key={idx} positioning={{ placement: 'left' }}>
                    <Popover.Trigger asChild>
                      <Button
                        variant="ghost"
                        w="full"
                        justifyContent="flex-start"
                        p={2}
                        borderRadius="lg"
                        _hover={{ bg: 'whiteAlpha.500' }}
                      >
                        <HStack w="full">
                          <Text fontWeight="medium" fontSize="sm" color="gray.700">
                            {participant.name}
                          </Text>
                          {participant.name === '나' && (
                            <Badge ml="auto" fontSize="xs" bg="#25D366" color="white">ME</Badge>
                          )}
                        </HStack>
                      </Button>
                    </Popover.Trigger>
                    {participant.name !== '나' && (
                      <Popover.Positioner>
                        <Popover.Content w="200px">
                          <Popover.Arrow />
                          <Popover.Body p={2}>
                            <VStack align="stretch" gap={1}>
                              <Button size="sm" variant="ghost" onClick={() => handlePrivateChat(participant.id)}>
                                1:1 채팅하기
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleVoiceChat(participant.id)}>
                                보이스톡
                              </Button>
                            </VStack>
                          </Popover.Body>
                        </Popover.Content>
                      </Popover.Positioner>
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
