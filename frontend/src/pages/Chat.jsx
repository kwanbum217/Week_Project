import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Container,
  Button,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Chat = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isGuest = !user || user.username === 'Guest';

  // Guest Mock Data - "Demo" Chat List
  const guestChatList = [
    { id: 1, name: '무아지기', message: '무아에 오신 것을 환영합니다! 👋', time: '방금', unread: 1, avatar: 'M' },
    { id: 2, name: '즐거운하루', message: '이번 주 등산 모임 오시나요?', time: '10분 전', unread: 2, avatar: '즐' },
    { id: 3, name: '등산매니아', message: '사진을 보냈습니다.', time: '어제', unread: 0, avatar: '등' },
  ];

  const chatList = isGuest ? guestChatList : []; // Real user logic would go here

  // Helper to chunk array (Same as Match.jsx)
  const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  const chatRows = chunkArray(chatList, 3);

  return (
    <Flex direction="column" minH="100vh">
      <Box maxW="1980px" mx="auto" px="200px" py={10} flex="1" w="full">
        <VStack spacing={10} align="stretch">
          {/* Map Section - Simulated Kakao Map */}
          <Box
            w="full"
            h="400px"
            borderRadius="2xl"
            overflow="hidden"
            position="relative"
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            {/* Map Background */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundImage="url('/img/map_background.png')"
              backgroundSize="cover"
              backgroundPosition="center"
            />

            {/* Overlay Info */}
            <Box
              position="absolute"
              top={4}
              left={4}
              bg="whiteAlpha.900"
              p={4}
              borderRadius="xl"
              boxShadow="md"
              zIndex={2}
              maxW="lg"
            >
              <Heading size="md" color="var(--mooa-navy)" mb={1}>
                내 주변 대화 친구
              </Heading>
              <Text fontSize="sm" color="gray.600">
                회원가입시 <strong>대화 요청을 허락한 사용자</strong>들이 지도에 표시됩니다.
              </Text>
            </Box>

            {/* Simulated Markers */}
            {[
              { top: '30%', left: '40%', name: '행복한산책', avatar: '행' },
              { top: '60%', left: '60%', name: '즐거운하루', avatar: '즐' },
              { top: '45%', left: '70%', name: '건강지킴이', avatar: '건' },
              { top: '70%', left: '20%', name: '등산매니아', avatar: '등' },
            ].map((marker, idx) => (
              <Box
                key={idx}
                position="absolute"
                top={marker.top}
                left={marker.left}
                transform="translate(-50%, -50%)"
                zIndex={1}
                cursor="pointer"
                _hover={{ zIndex: 10, transform: "translate(-50%, -50%) scale(1.1)" }}
                transition="all 0.2s"
              >
                <Box position="relative">
                  <Box
                    w="48px"
                    h="48px"
                    bg="var(--mooa-orange)"
                    color="white"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize="lg"
                    boxShadow="lg"
                    border="3px solid white"
                  >
                    {marker.avatar}
                  </Box>
                  {/* Pulse Effect */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    borderRadius="full"
                    bg="var(--mooa-orange)"
                    opacity={0.4}
                    animation="ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
                    zIndex={-1}
                  />
                  {/* Tooltip Label */}
                  <Box
                    position="absolute"
                    top="-35px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    boxShadow="md"
                    whiteSpace="nowrap"
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray.700"
                  >
                    {marker.name}
                  </Box>
                  {/* Arrow for tooltip */}
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%) rotate(45deg)"
                    w={3}
                    h={3}
                    bg="white"
                  />
                </Box>
              </Box>
            ))}

            {/* Kakao Map Logo Placeholder (Bottom Right) */}
            <Box position="absolute" bottom={2} right={2} opacity={0.7}>
              <Text fontSize="xs" fontWeight="bold" bg="whiteAlpha.800" px={1}>KakaoMap</Text>
            </Box>
          </Box>

          {/* Header */}
          <Box textAlign="center" pt="60px">
            <Heading as="h1" size="2xl" mb={4} color="var(--mooa-navy)">
              대화하기
            </Heading>
            <Text fontSize="xl" color="gray.600">
              {isGuest
                ? "로그인 계정이 없으시군요? 아래는 대화방 예시입니다."
                : "참여 중인 대화방 목록입니다."}
            </Text>
          </Box>

          {/* Grid Rows */}
          <VStack align="stretch">
            {chatRows.length > 0 ? chatRows.map((row, rowIndex) => (
              <Flex
                key={rowIndex}
                mb="75px"
                direction={{ base: 'column', lg: 'row' }}
                gap="40px"
                align="stretch"
                justify="center" // Center if fewer than 3 items
              >
                {row.map((chat) => (
                  <Box
                    key={chat.id}
                    flex={1}
                    minW="300px"
                    bg="white"
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="lg"
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                    border="1px solid"
                    borderColor="gray.100"
                    cursor="pointer"
                    onClick={() => isGuest ? navigate('/login') : console.log('Open chat')}
                    display="flex"
                    flexDirection="column"
                  >
                    <Flex p={6} flex="1" flexDirection="column">
                      <Flex align="center" gap={4} mb={4}>
                        <Flex
                          w="60px"
                          h="60px"
                          borderRadius="full"
                          bg="var(--mooa-orange-light)"
                          color="var(--mooa-orange-dark)"
                          align="center"
                          justify="center"
                          fontSize="xl"
                          fontWeight="bold"
                          shrink={0}
                        >
                          {chat.avatar}
                        </Flex>
                        <Box flex={1}>
                          <Flex justify="space-between" align="center" mb={1}>
                            <Heading fontSize="lg" color="var(--mooa-navy)">
                              {chat.name}
                            </Heading>
                            <Text fontSize="sm" color="gray.500">
                              {chat.time}
                            </Text>
                          </Flex>
                          <Text fontSize="sm" color="gray.500" noOfLines={1}>
                            {isGuest && chat.id !== 1 ? '🔒 (내용을 보려면 로그인하세요)' : chat.message}
                          </Text>
                        </Box>
                      </Flex>

                      {chat.unread > 0 ? (
                        <Flex justify="flex-end" mb="auto">
                          <Box
                            bg="red.500"
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                          >
                            {chat.unread}개 안 읽음
                          </Box>
                        </Flex>
                      ) : <Box mb="auto" />}

                      <Button
                        w="full"
                        mt={6}
                        bg="white"
                        border="1px solid"
                        borderColor="var(--mooa-orange)"
                        color="var(--mooa-orange)"
                        _hover={{ bg: 'orange.50' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          isGuest ? navigate('/login') : console.log('Enter chat');
                        }}
                      >
                        대화방 입장하기
                      </Button>
                    </Flex>
                  </Box>
                ))}
                {/* Spacer (if needed to push items left, but 'justify=center' keeps them centered like Match.jsx mostly does, or logic differs. 
                    Match.jsx uses justify="center". If there is 1 item, it centers. 
                    If the user wants strictly left aligned for incomplete rows, justify="start" is better. 
                    But Match.jsx uses justify="center". I will stick to Match.jsx logic: justify="center".
                */}
              </Flex>
            )) : (
              <Box textAlign="center" py={20} color="gray.500">
                대화방이 없습니다. 친구를 찾아 대화를 시작해보세요!
              </Box>
            )}
          </VStack>

          {/* Guest CTA (Same style as Match.jsx) */}
          {isGuest && (
            <Box
              mt="75px"
              textAlign="center"
              p={8}
              borderRadius="2xl"
              position="relative"
              overflow="hidden"
              backgroundImage="url('/img/chat_guest_banner.jpg')"
              backgroundSize="cover"
              backgroundPosition="center 30%"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: 'blackAlpha.600',
                zIndex: 1
              }}
            >
              <Box position="relative" zIndex={2}>
                <Heading size="lg" mb={2} color="white" fontWeight="bold">
                  더 많은 친구들과 대화해보세요
                </Heading>
                <Text color="whiteAlpha.900" fontSize="lg" mb={6}>
                  궁금한 모임에 참여하고, 친구들과 즐겁게 수다를 떨어보세요!
                </Text>
                <Button
                  colorScheme="orange"
                  bg="var(--mooa-orange)"
                  color="white"
                  onClick={() => navigate('/login')}
                  size="lg"
                  px={8}
                  h="56px"
                  fontSize="lg"
                  _hover={{ bg: 'orange.500', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  로그인하고 대화하기
                </Button>
              </Box>
            </Box>
          )}
        </VStack>
      </Box>
      <Footer />
    </Flex>

  );
};

export default Chat;
