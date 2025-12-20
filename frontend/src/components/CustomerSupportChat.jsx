import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  HStack,
  IconButton,
  Spinner
} from '@chakra-ui/react';
import { CloseButton } from '@chakra-ui/react';

const CustomerSupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:9999/api/support/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          type: 'ai',
          content: data.answer,
          category: data.category,
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || '응답을 받지 못했습니다.');
      }
    } catch (error) {
      const errorMessage = {
        type: 'ai',
        content: `오류가 발생했습니다: ${error.message}`,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      {!isOpen && (
        <IconButton
          position="fixed"
          bottom="30px"
          right="30px"
          size="lg"
          borderRadius="full"
          background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white"
          boxShadow="0 8px 24px rgba(102, 126, 234, 0.4)"
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
          }}
          transition="all 0.3s ease"
          onClick={() => setIsOpen(true)}
          zIndex={1000}
          aria-label="고객센터"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>
      )}

      {/* 채팅 윈도우 */}
      {isOpen && (
        <Box
          position="fixed"
          bottom="30px"
          right="30px"
          width="400px"
          height="600px"
          background="white"
          borderRadius="20px"
          boxShadow="0 20px 60px rgba(0, 0, 0, 0.3)"
          display="flex"
          flexDirection="column"
          zIndex={1000}
          overflow="hidden"
          border="1px solid rgba(102, 126, 234, 0.2)"
        >
          {/* 헤더 */}
          <Box
            background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            p={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack spacing={3}>
              <Box
                width="40px"
                height="40px"
                borderRadius="full"
                background="rgba(255, 255, 255, 0.2)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor" />
                </svg>
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" fontSize="md">고객센터</Text>
                <Text fontSize="xs" opacity={0.9}>AI 상담원</Text>
              </VStack>
            </HStack>
            <CloseButton onClick={() => setIsOpen(false)} size="sm" />
          </Box>

          {/* 메시지 영역 */}
          <VStack
            flex={1}
            overflowY="auto"
            p={4}
            spacing={3}
            align="stretch"
            bg="gray.50"
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#cbd5e0',
                borderRadius: '3px',
              },
            }}
          >
            {messages.length === 0 && (
              <Box textAlign="center" py={8}>
                <Text color="gray.500" fontSize="sm">
                  무엇을 도와드릴까요?
                </Text>
                <Text color="gray.400" fontSize="xs" mt={2}>
                  궁금한 점을 물어보세요!
                </Text>
              </Box>
            )}

            {messages.map((msg, index) => (
              <Box
                key={index}
                alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
                maxWidth="80%"
              >
                <Box
                  bg={msg.type === 'user'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'white'
                  }
                  color={msg.type === 'user' ? 'white' : 'gray.800'}
                  p={3}
                  borderRadius="12px"
                  boxShadow="sm"
                  position="relative"
                >
                  <Text fontSize="sm" lineHeight="1.5" whiteSpace="pre-wrap">
                    {msg.content}
                  </Text>
                  <Text
                    fontSize="xs"
                    opacity={0.7}
                    mt={1}
                    textAlign="right"
                  >
                    {msg.timestamp}
                  </Text>
                </Box>
              </Box>
            ))}

            {isLoading && (
              <Box alignSelf="flex-start" maxWidth="80%">
                <Box bg="white" p={3} borderRadius="12px" boxShadow="sm">
                  <HStack spacing={2}>
                    <Spinner size="sm" color="purple.500" />
                    <Text fontSize="sm" color="gray.600">답변 작성 중...</Text>
                  </HStack>
                </Box>
              </Box>
            )}
          </VStack>

          {/* 입력 영역 */}
          <Box p={4} bg="white" borderTop="1px solid" borderColor="gray.200">
            <HStack spacing={2}>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                size="md"
                borderRadius="full"
                _focus={{
                  borderColor: 'purple.400',
                  boxShadow: '0 0 0 1px #764ba2',
                }}
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                borderRadius="full"
                size="md"
                px={6}
                _hover={{
                  transform: 'scale(1.05)',
                }}
                transition="all 0.2s"
                isLoading={isLoading}
                disabled={!inputMessage.trim() || isLoading}
              >
                전송
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CustomerSupportChat;
