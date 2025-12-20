import { useState, useEffect, useRef } from 'react';
import { Box, Input, VStack, Text, HStack, Heading, Button } from '@chakra-ui/react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  // Listen for user updates from other windows
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Initial check in case we missed the event or opened later
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && !user) {
      setUser(storedUser);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      console.log("No user found, waiting for login...");
      return;
    }

    const socket = new SockJS('http://localhost:9999/ws');
    const client = Stomp.over(socket);
    client.debug = null; // Disable debug logs

    console.log("Attempting WebSocket connection for user:", user.username);

    client.connect({}, () => {
      console.log("✅ WebSocket connected successfully!");
      setIsConnected(true);

      client.subscribe('/topic/public', (payload) => {
        const receivedMessage = JSON.parse(payload.body);
        console.log("Received message from WebSocket:", receivedMessage);

        // JOIN/LEAVE 메시지는 항상 추가
        if (receivedMessage.type === 'JOIN' || receivedMessage.type === 'LEAVE') {
          setMessages((prev) => [...prev, receivedMessage]);
          return;
        }

        // CHAT 메시지는 중복 체크 후 추가
        setMessages((prev) => {
          // 자신이 보낸 메시지는 이미 로컬에 추가되었으므로 무시
          const isDuplicate = prev.some(
            msg => msg.sender === receivedMessage.sender &&
              msg.content === receivedMessage.content &&
              msg.type === 'CHAT'
          );

          if (isDuplicate) {
            console.log("Duplicate message detected, ignoring");
            return prev;
          }

          console.log("Adding new message from WebSocket");
          return [...prev, receivedMessage];
        });
      });

      client.send("/app/chat.addUser",
        {},
        JSON.stringify({ sender: user.username, type: 'JOIN' })
      );
    }, (error) => {
      console.error("❌ WebSocket connection error:", error);
      setIsConnected(false);
    });

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
      setIsConnected(false);
    };
  }, [user]);

  const sendMessage = () => {
    if (!message.trim()) {
      console.warn("Empty message, not sending");
      return;
    }

    if (!user) {
      console.error("No user logged in");
      return;
    }

    const chatMessage = {
      sender: user.username,
      content: message.trim(),
      type: 'CHAT'
    };

    console.log("Sending message:", chatMessage);

    // 즉시 로컬 상태에 추가하여 UI에 표시
    setMessages((prev) => {
      // 중복 체크 (혹시 이미 있는지)
      const exists = prev.some(
        msg => msg.sender === chatMessage.sender &&
          msg.content === chatMessage.content &&
          msg.type === 'CHAT'
      );

      if (exists) {
        console.log("Message already exists locally");
        return prev;
      }

      return [...prev, chatMessage];
    });

    setMessage('');

    // WebSocket으로 전송 (연결되어 있으면)
    if (stompClient && isConnected) {
      try {
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        console.log("Message sent via WebSocket");
      } catch (error) {
        console.error("Failed to send message via WebSocket:", error);
      }
    } else {
      console.warn("WebSocket not connected. Message only saved locally.");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#f0e6d2"
        fontFamily="'Courier New', Courier, monospace"
      >
        <VStack spacing={4}>
          <Heading size="lg" color="#5c4033">Letter Chat</Heading>
          <Text color="#8b4513">Please log in from the main window to start chatting.</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      bg="#f0e6d2"
      color="#3e2723"
      fontFamily="'Courier New', Courier, monospace"
      height="100vh"
      p={4}
      display="flex"
      flexDirection="column"
      backgroundImage="linear-gradient(#e1d9c5 1px, transparent 1px), linear-gradient(90deg, #e1d9c5 1px, transparent 1px)"
      backgroundSize="20px 20px"
    >
      <Box
        borderBottom="2px solid #5c4033"
        mb={4}
        pb={2}
        textAlign="center"
      >
        <Heading size="md" color="#5c4033" fontFamily="'Courier New', Courier, monospace" letterSpacing="widest">
          DAILY CHAT
        </Heading>
        <Text fontSize="xs" color="#8b4513" fontStyle="italic">Est. 2025 • Vol. 1</Text>
        <Text fontSize="xs" color={isConnected ? "green.600" : "red.600"} fontWeight="bold" mt={1}>
          {isConnected ? "• Connected" : "• Disconnected"}
        </Text>
      </Box>

      <VStack
        flex={1}
        overflowY="auto"
        align="stretch"
        spacing={4}
        mb={4}
        p={4}
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#8b4513',
            borderRadius: '0px',
          },
        }}
      >
        {messages.map((msg, index) => (
          <Box key={index} alignSelf={msg.sender === user.username ? 'flex-end' : 'flex-start'} maxWidth="80%">
            {msg.type === 'JOIN' || msg.type === 'LEAVE' ? (
              <Text fontSize="xs" color="#8b4513" fontStyle="italic" textAlign="center" width="100%">
                *** {msg.sender} {msg.content} ***
              </Text>
            ) : (
              <Box>
                <Text fontSize="xs" color="#5c4033" mb={0} fontWeight="bold">
                  {msg.sender === user.username ? 'Me' : msg.sender}
                </Text>
                <Box
                  bg={msg.sender === user.username ? '#fff9c4' : '#ffffff'}
                  p={3}
                  border="1px solid #8b4513"
                  boxShadow="3px 3px 0px rgba(92, 64, 51, 0.2)"
                  position="relative"
                >
                  <Text fontSize="sm" lineHeight="1.5">
                    {msg.content}
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </VStack>

      <HStack
        pt={2}
        alignItems="center"
        p={2}
        borderTop="2px solid #5c4033"
        bg="#f0e6d2"
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a letter..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          bg="transparent"
          border="none"
          borderBottom="1px solid #5c4033"
          _focus={{ boxShadow: 'none', borderBottom: '2px solid #8b4513' }}
          color="#3e2723"
          autoFocus
          _placeholder={{ color: '#8d6e63', fontStyle: 'italic' }}
          borderRadius="0"
          px={2}
          fontFamily="'Courier New', Courier, monospace"
        />
        <Button
          onClick={sendMessage}
          bg="#5c4033"
          color="#f0e6d2"
          borderRadius="0"
          _hover={{ bg: "#3e2723" }}
          size="sm"
          fontFamily="'Courier New', Courier, monospace"
        >
          SEND
        </Button>
      </HStack>
    </Box>
  );
};

export default Chat;
