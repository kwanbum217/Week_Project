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
  Button
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
    const token = localStorage.getItem("accessToken");
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

  return (
    <Flex direction="column" minH="100vh">
      <Box maxW="1200px" mx="auto" px={4} py={10} flex="1" w="full">
        <VStack spacing={4} align="stretch" h="full">
          <Heading>Chat Room {roomId ? roomId : 'Public'}</Heading>

          <Box flex="1" bg="gray.50" borderRadius="md" p={4} overflowY="auto" h="500px">
            {messages.map((msg, idx) => (
              <Box key={idx} mb={2} p={2} bg="white" borderRadius="md" boxShadow="sm">
                <Text fontWeight="bold">{msg.sender}</Text>
                <Text>{msg.content}</Text>
              </Box>
            ))}
          </Box>

          <HStack>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} colorScheme="blue">Send</Button>
          </HStack>
        </VStack>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Chat;
