import { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Button, Flex, VStack, HStack, Stack } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaRegEnvelope, FaComments } from 'react-icons/fa6';
import Footer from '../components/Footer';

const Match = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Rich Mock Data
  const matches = [
    {
      id: 1,
      name: '행복한산행',
      gender: '여성',
      age: 65,
      location: '서울 강남구',
      image: '/img/friend_hiking.png',
      matchRate: 98,
      distance: 0.8,
      interests: ['등산', '요가', '건강']
    },
    {
      id: 2,
      name: '두바퀴여행',
      gender: '남성',
      age: 68,
      location: '서울 서초구',
      image: '/img/friend_cycling.png',
      matchRate: 92,
      distance: 1.5,
      interests: ['자전거', '여행', '사진']
    },
    {
      id: 3,
      name: '즐거운스텝',
      gender: '여성',
      age: 62,
      location: '서울 송파구',
      image: '/img/friend_dancing.png',
      matchRate: 88,
      distance: 2.1,
      interests: ['댄스', '음악', '사교']
    },
    {
      id: 4,
      name: '지혜의숲',
      gender: '남성',
      age: 64,
      location: '서울 강남구',
      image: '/img/friend_chess.png',
      matchRate: 85,
      distance: 1.2,
      interests: ['바둑', '독서', '토론']
    },
    {
      id: 5,
      name: '맛있는식탁',
      gender: '여성',
      age: 66,
      location: '서울 강동구',
      image: '/img/friend_hiking.png',
      matchRate: 80,
      distance: 3.5,
      interests: ['요리', '원예', '봉사']
    },
    {
      id: 6,
      name: '강태공',
      gender: '남성',
      age: 70,
      location: '경기 성남시',
      image: '/img/friend_cycling.png',
      matchRate: 78,
      distance: 5.2,
      interests: ['낚시', '등산', '맛집']
    }
  ];

  const categories = ['전체', '운동/건강', '문화/예술', '여행', '봉사활동'];

  // Guest Check (Treat null user as guest too)
  const isGuest = !user || user.username === 'Guest';

  // Filter Logic
  const filteredMatches = matches.filter(friend => {
    if (selectedFilter === '전체') return true;
    const categoryMap = {
      '운동/건강': ['등산', '요가', '건강', '자전거', '낚시'],
      '문화/예술': ['댄스', '음악', '사교', '바둑', '독서', '토론', '사진'],
      '여행': ['여행', '맛집'],
      '봉사활동': ['봉사', '원예', '요리']
    };
    const targetInterests = categoryMap[selectedFilter] || [];
    return friend.interests.some(i => targetInterests.includes(i));
  });

  // Limit for Guest (Show 6 items = 2 rows)
  const displayMatches = isGuest ? filteredMatches.slice(0, 6) : filteredMatches;

  // Helper to chunk array
  const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  const matchRows = chunkArray(displayMatches, 3);

  return (
    <Flex direction="column" minH="100vh">
      <Box maxW="1980px" mx="auto" px="200px" py={10} flex="1" w="full">
        <VStack spacing={10} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4} color="var(--mooa-navy)">
              내 주변 친구 찾기
            </Heading>
            <Text fontSize="xl" color="gray.600">
              {isGuest
                ? "회원가입 후 로그인하고 더 많은 동네 친구를 만나보세요!"
                : "나와 비슷한 취미를 가진 동네 친구를 만나보세요."}
            </Text>
          </Box>

          {/* Filter Chips */}
          <Flex justify="center" gap={4} wrap="wrap" mb={24}>
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                borderRadius="full"
                px={6}
                bg={selectedFilter === cat ? 'var(--mooa-orange)' : 'white'}
                color={selectedFilter === cat ? 'white' : 'gray.600'}
                border="1px solid"
                borderColor="gray.200"
                _hover={{ bg: selectedFilter === cat ? 'var(--mooa-orange)' : 'gray.50' }}
              >
                {cat}
              </Button>
            ))}
          </Flex>

          {/* Friends Grid (Rows of 3) */}
          <VStack align="stretch">
            {matchRows.map((row, rowIndex) => (
              <Flex
                key={rowIndex}
                mb="75px"
                direction={{ base: 'column', lg: 'row' }}
                gap="40px"
                align="stretch"
                justify="center"
                position="relative"
              >
                {row.map((friend, friendIndex) => {
                  const isFemale = friend.gender === '여성';

                  return (
                    <Box
                      key={friend.id}
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
                    >
                      <Box p={4}>
                        <Flex align="center" gap={3} mb={4}>
                          <Box
                            w="60px"
                            h="60px"
                            borderRadius="full"
                            bg="gray.200"
                            flexShrink={0}
                            overflow="hidden"
                            position="relative"
                          >
                            <img
                              src={friend.image}
                              alt={friend.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: isGuest ? 'blur(4px)' : 'none'
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.backgroundColor = '#E2E8F0';
                              }}
                            />
                          </Box>

                          <Box>
                            <Heading fontSize="lg" mb={1}>
                              {friend.name}
                            </Heading>
                            <Text fontSize="sm" color="gray.600" mb={1}>
                              {friend.age}세 ({friend.gender})
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              📍 {isGuest ? friend.location.split(' ')[0] + ' ***' : friend.location} ({friend.distance}km)
                            </Text>
                          </Box>

                          <Box ml="auto" bg="orange.100" color="orange.800" fontSize="0.9em" fontWeight="bold" borderRadius="md" px={2} py={1} whiteSpace="nowrap">
                            {friend.matchRate}% 일치
                          </Box>
                        </Flex>

                        <Text color="gray.600" mb={4} fontSize="sm">
                          {isGuest ? "\"회원가입하고 저와 친구가 되어주세요!\"" : "\"같이 등산 다니실 분 찾아요~ 편하게 연락주세요!\""}
                        </Text>

                        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
                          주요 관심사
                        </Text>
                        <HStack spacing={2} mb={6}>
                          {friend.interests.map(interest => (
                            <Box key={interest} px={2} py={1} bg="blue.50" color="blue.600" borderRadius="full" fontSize="sm" fontWeight="medium">
                              #{interest}
                            </Box>
                          ))}
                        </HStack>

                        <Button
                          w="full"
                          style={{
                            background: isFemale ? 'linear-gradient(to bottom, #FF80AB, #FF4081)' : 'linear-gradient(to bottom, #2C4A6E, #1E3A5F)',
                          }}
                          color="white"
                          mb={2}
                          onClick={() => isGuest ? navigate('/login') : alert('친구 추가 되었습니다!')}
                          justifyContent="center"
                          px={6}
                          _hover={{
                            opacity: 0.9
                          }}
                        >
                          <Flex w="100%" align="center" justify="space-between">
                            <Text>{isGuest ? "로그인하고 친구 추가하기" : "친구 추가하기"}</Text>
                            <Flex align="center">
                              <Box w="1px" h="16px" bg="whiteAlpha.400" mx={4} />
                              <FaUserPlus />
                            </Flex>
                          </Flex>
                        </Button>

                        <Button
                          w="full"
                          style={{
                            background: isFemale ? 'linear-gradient(to bottom, #FF4081, #F50057)' : 'linear-gradient(to bottom, #1E3A5F, #162B47)',
                          }}
                          color="white"
                          mb={2}
                          onClick={() => isGuest ? navigate('/login') : alert('문자가 전송되었습니다!')}
                          justifyContent="center"
                          px={6}
                          _hover={{
                            opacity: 0.9
                          }}
                        >
                          <Flex w="100%" align="center" justify="space-between">
                            <Text>{isGuest ? "로그인하고 문자 보내기" : "문자 보내기"}</Text>
                            <Flex align="center">
                              <Box w="1px" h="16px" bg="whiteAlpha.400" mx={4} />
                              <FaRegEnvelope />
                            </Flex>
                          </Flex>
                        </Button>

                        <Button
                          w="full"
                          style={{
                            background: isFemale ? 'linear-gradient(to bottom, #F50057, #C51162)' : 'linear-gradient(to bottom, #162B47, #0D1A2B)',
                          }}
                          color="white"
                          onClick={() => isGuest ? navigate('/login') : navigate('/chat')}
                          justifyContent="center"
                          px={6}
                          _hover={{
                            opacity: 0.9
                          }}
                        >
                          <Flex w="100%" align="center" justify="space-between">
                            <Text>{isGuest ? "로그인하고 대화하기" : "대화 요청하기"}</Text>
                            <Flex align="center">
                              <Box w="1px" h="16px" bg="whiteAlpha.400" mx={4} />
                              <FaComments />
                            </Flex>
                          </Flex>
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Flex>
            ))}
          </VStack>
          {/* Guest CTA Card - Shown if list is truncated or just always at end? 
              Actually, slicing limiting to 3 items + a CTA card is better pattern. 
              But let's put a banner below the grid.
           */}

          {isGuest && (
            <Box
              mt="75px"
              textAlign="center"
              p={8}
              borderRadius="2xl"
              position="relative"
              overflow="hidden"
              bg="gray.900"
              backgroundImage="url('/img/match_banner.jpg')"
              backgroundSize="cover"
              backgroundPosition="center 35%"
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
                <Heading size="lg" mb={2} color="white">더 많은 친구들이 기다리고 있어요!</Heading>
                <Text color="whiteAlpha.900" mb={6}>간단하게 가입하고 100명 이상의 동네 친구를 만나보세요.</Text>
                <Button
                  colorScheme="orange"
                  bg="var(--mooa-orange)"
                  color="white"
                  onClick={() => navigate('/signup')}
                  size="lg"
                  _hover={{ bg: 'orange.500' }}
                >
                  무아 회원가입하기
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

export default Match;
