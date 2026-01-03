import { Box, Container, Heading, Text, VStack, SimpleGrid, Badge, Button, Flex, HStack } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = () => {
    const navigate = useNavigate();

    // Friends data sorted by distance
    const recommendedFriends = [
        {
            id: 1,
            name: '행복한산행',
            age: 65,
            location: '서울 강남구',
            image: '/img/friend_hiking.png',
            matchRate: 95,
            distance: 0.8,
            interests: ['등산', '요가', '독서']
        },
        {
            id: 2,
            name: '두바퀴여행',
            age: 68,
            location: '서울 강남구',
            image: '/img/friend_cycling.png',
            matchRate: 88,
            distance: 1.2,
            interests: ['자전거', '사진', '여행']
        },
        {
            id: 4,
            name: '지혜의숲',
            age: 64,
            location: '서울 강남구',
            image: '/img/friend_chess.png',
            matchRate: 90,
            distance: 1.5,
            interests: ['등산', '사진', '독서']
        },
        {
            id: 3,
            name: '즐거운스텝',
            age: 62,
            location: '서울 강남구',
            image: '/img/friend_dancing.png',
            matchRate: 82,
            distance: 2.1,
            interests: ['요리', '댄스', '원예']
        }
    ];

    const nearbyMeetings = [
        {
            id: 1,
            title: '강남 아침 등산 클럽',
            category: '운동/건강',
            image: '/img/friend_hiking.png',
            distance: '1.3km',
            members: 24,
            date: '2025년 1월 5일',
            location: '대치동 은마아파트 앞'
        },
        {
            id: 2,
            title: '강남 요가와 명상',
            category: '운동/건강',
            image: '/img/friend_cycling.png', // Using existing image as placeholder
            distance: '0.9km',
            members: 18,
            date: '매주 수요일',
            location: '강남역 커뮤니티 센터'
        },
        {
            id: 3,
            title: '강남 주말 사진 모임',
            category: '취미/여가',
            image: '/img/friend_chess.png', // Using existing image as placeholder
            distance: '1.7km',
            members: 15,
            date: '매주 토요일 오전 9시',
            location: '선릉역 2번 출구'
        },
        {
            id: 4,
            title: '강남 독서 토론회',
            category: '문화/교양',
            image: '/img/friend_dancing.png', // Using existing image as placeholder
            distance: '2.0km',
            members: 22,
            date: '2025년 1월 10일',
            location: '역삼동 도서관'
        },
        {
            id: 5,
            title: '강남 맛집 탐방',
            category: '취미/여가',
            image: '/img/friend_hiking.png',
            distance: '0.5km',
            members: 30,
            date: '매주 금요일 저녁',
            location: '강남역 11번 출구'
        },
        {
            id: 6,
            title: '강남 영어 회화',
            category: '문화/교양',
            image: '/img/friend_cycling.png',
            distance: '1.1km',
            members: 12,
            date: '매주 월요일 저녁',
            location: '역삼역 스터디카페'
        }
    ];

    const chatRooms = [
        { id: 1, title: "건강한 식단 공유", participants: 128, tags: ["#건강", "#요리"], image: "/img/chat_couple.jpg" },
        { id: 2, title: "주말 등산 함께해요", participants: 45, tags: ["#등산", "#운동"], image: "/img/chat_couple.jpg" },
        { id: 3, title: "손주 자랑방", participants: 312, tags: ["#가족", "#행복"], image: "/img/chat_couple.jpg" },
        { id: 4, title: "트로트 명곡 추천", participants: 89, tags: ["#음악", "#취미"], image: "/img/chat_couple.jpg" }
    ];

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Box flex="1">
                {/* Hero Section */}
                <Box pt={0} position="relative" overflow="hidden">
                    {/* 배경 장식 */}
                    <div className="absolute inset-0 pointer-events-none -z-10">
                        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-100/50 blur-3xl animate-float-gentle" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
                    </div>

                    <Box maxW="1980px" mx="auto" px="200px" py={8}>
                        <VStack spacing={8} textAlign="center" alignItems="center">
                            <Box className="animate-fade-in">
                                <Text
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    color="var(--mooa-orange)"
                                    fontWeight="bold"
                                    mb={4}
                                >
                                    시니어 소셜 네트워킹 플랫폼
                                </Text>
                                <Heading
                                    as="h1"
                                    fontSize={{ base: "4xl", md: "6xl" }}
                                    fontWeight="900"
                                    lineHeight="1.2"
                                    color="var(--mooa-navy)"
                                    mb={6}
                                >
                                    친구와 함께하는<br />
                                    <span style={{ color: 'var(--mooa-orange)' }}>즐거운 인생 2막</span>
                                </Heading>
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="var(--mooa-text-secondary)"
                                    maxW="2xl"
                                    mx="auto"
                                    mb={10}
                                >
                                    비슷한 취미를 가진 동네 친구를 만나고,<br />
                                    새로운 모임에서 활력 넘치는 일상을 만들어보세요.
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                </Box>

                {/* Recommended Friends Section */}
                <Box py={20} bg="#F8F9FA">
                    <Box maxW="1980px" mx="auto" px="200px">
                        <VStack spacing={2} align="start" mb={10}>
                            <Heading fontSize="2xl" color="gray.800">
                                가까운 친구 추천
                            </Heading>
                            <Text color="gray.500" fontSize="lg">
                                나와 가까운 거리의 친구를 추천합니다
                            </Text>
                            <Text color="gray.500" fontSize="sm">
                                - 회원 가입시 기입한 나의 주소와 가장 가까운 친구를 거리순서대로 추천해 드립니다.
                            </Text>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="50px">
                            {recommendedFriends.map((friend) => (
                                <Box
                                    key={friend.id}
                                    bg="white"
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    boxShadow="lg"
                                    transition="all 0.3s"
                                    _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                                    position="relative"
                                >
                                    {/* Image Area with Badges */}
                                    <Box height="200px" position="relative">
                                        <img
                                            src={friend.image}
                                            alt={friend.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <Flex position="absolute" top={3} left={3} gap={2}>
                                            <Badge
                                                bg="#2D3250"
                                                color="white"
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                                display="flex"
                                                alignItems="center"
                                                gap={1}
                                            >
                                                📍 나와의 거리
                                            </Badge>
                                            <Badge
                                                bg="#20C997"
                                                color="white"
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                                display="flex"
                                                alignItems="center"
                                                gap={1}
                                            >
                                                {friend.distance}km
                                            </Badge>
                                        </Flex>
                                    </Box>

                                    {/* Content Area */}
                                    <Box p={3}>
                                        <VStack align="start" spacing={3}>
                                            <Box>
                                                <Flex align="baseline" gap={2}>
                                                    <Text fontSize="xl" fontWeight="bold" color="gray.800">
                                                        {friend.name},
                                                    </Text>
                                                    <Text fontSize="xl" color="gray.600">
                                                        {friend.age}
                                                    </Text>
                                                </Flex>
                                                <Text fontSize="sm" color="gray.500">
                                                    {friend.location}
                                                </Text>
                                            </Box>

                                            <Flex gap={2} flexWrap="wrap">
                                                {friend.interests.map((interest, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        colorScheme="green"
                                                        variant="subtle"
                                                        borderRadius="full"
                                                        px={3}
                                                        py={1}
                                                        color="#20C997"
                                                        bg="#E6FCF5"
                                                    >
                                                        {interest}
                                                    </Badge>
                                                ))}
                                            </Flex>

                                            <Flex w="full" gap={1} mt={2}>
                                                <Button
                                                    flex={1}
                                                    bg="#2D3250"
                                                    color="white"
                                                    _hover={{ bg: "#1A2035" }}
                                                    borderRadius="xl"
                                                    fontSize="11px"
                                                    px={1}
                                                    h="32px"
                                                    leftIcon={<span style={{ fontSize: '12px' }}>👤+</span>}
                                                >
                                                    친구 추가
                                                </Button>
                                                <Button
                                                    flex={1}
                                                    bg="#FF8E53"
                                                    color="white"
                                                    _hover={{ bg: "#E67035" }}
                                                    borderRadius="xl"
                                                    fontSize="11px"
                                                    px={1}
                                                    h="32px"
                                                    leftIcon={<span style={{ fontSize: '12px' }}>✉️</span>}
                                                >
                                                    문자 보내기
                                                </Button>
                                                <Button
                                                    flex={1}
                                                    bg="#4A5568"
                                                    color="white"
                                                    _hover={{ bg: "#2D3748" }}
                                                    borderRadius="xl"
                                                    fontSize="11px"
                                                    px={1}
                                                    h="32px"
                                                    leftIcon={<span style={{ fontSize: '12px' }}>💬</span>}
                                                >
                                                    대화 요청
                                                </Button>
                                            </Flex>
                                        </VStack>
                                    </Box>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Box>

                {/* Nearby Meetings Section */}
                <Box py={20} bg="white">
                    <Box maxW="1980px" mx="auto" px="200px">
                        <VStack spacing={2} align="start" mb={10}>
                            <Heading fontSize="2xl" color="gray.800">
                                지금, 우리 만나
                            </Heading>
                            <Text color="gray.500" fontSize="lg">
                                나와 가까운 거리의 모임을 추천합니다
                            </Text>
                            <Text color="gray.500" fontSize="sm">
                                - 회원 가입시 기입한 관심사를 참고하여 가장 가까운 모임을 추천해 드립니다.
                            </Text>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="50px">
                            {nearbyMeetings.map((meeting) => (
                                <Flex
                                    key={meeting.id}
                                    bg="white"
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    boxShadow="none"
                                    transition="all 0.3s"
                                    _hover={{ transform: 'translateY(-5px)' }}
                                    direction="row"
                                    h="180px"
                                >
                                    {/* Image Area (Left) */}
                                    <Box w="140px" h="100%" position="relative" flexShrink={0} borderRadius="2xl" overflow="hidden">
                                        <img
                                            src={meeting.image}
                                            alt={meeting.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <Badge
                                            position="absolute"
                                            top={2}
                                            left={2}
                                            bg="rgba(0, 163, 196, 0.9)"
                                            color="white"
                                            px={2}
                                            py={0.5}
                                            borderRadius="md"
                                            fontSize="xs"
                                        >
                                            {meeting.distance}
                                        </Badge>
                                    </Box>

                                    {/* Content Area (Right) */}
                                    <Box p={4} flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                                        <Box>
                                            <Flex justify="space-between" align="start" mb={1}>
                                                <Badge
                                                    colorScheme="orange"
                                                    variant="subtle"
                                                    borderRadius="md"
                                                    px={2}
                                                    fontSize="xs"
                                                    mb={1}
                                                >
                                                    {meeting.category}
                                                </Badge>
                                                <Text fontSize="xs" color="gray.400">
                                                    {meeting.date}
                                                </Text>
                                            </Flex>
                                            <Text fontSize="md" fontWeight="bold" color="gray.800" noOfLines={1} mb={2}>
                                                {meeting.title}
                                            </Text>
                                        </Box>

                                        <VStack align="start" spacing={1} w="full">
                                            <Flex align="center" gap={2} color="gray.600" fontSize="xs">
                                                <span>📍</span>
                                                <Text noOfLines={1}>{meeting.location}</Text>
                                            </Flex>
                                            <Flex align="center" gap={2} color="gray.600" fontSize="xs">
                                                <span>👥</span>
                                                <Text>{meeting.members}명 참여중</Text>
                                            </Flex>
                                        </VStack>

                                        {/* Optional: Add a small join button or arrow if needed, 
                                        but for now relying on the card click/hover affordance 
                                        or keeping it simple as per "intro" request. 
                                        Let's add a small text link/button at the bottom right or just keep it clean. */}
                                    </Box>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Box>

                {/* Chat Section */}
                <Box py={20} bg="#F8F9FA">
                    <Box maxW="1980px" mx="auto" px="200px">
                        <VStack spacing={2} align="start" mb={10}>
                            <Heading fontSize="2xl" color="gray.800">
                                대화하기
                            </Heading>
                            <Text color="gray.500" fontSize="lg">
                                관심사가 같은 친구들과 이야기를 나눠보세요
                            </Text>
                            <Text color="gray.500" fontSize="sm">
                                - 회원 가입 시 대화하기를 신청한 경우에 일대일 대화를 할 수 있습니다.
                            </Text>
                        </VStack>

                        <Box
                            bg="white"
                            borderRadius="2xl"
                            overflow="hidden"
                            boxShadow="none"
                            height="400px"
                            position="relative"
                            cursor="pointer"
                            transition="all 0.3s"
                            _hover={{ transform: 'translateY(-5px)', boxShadow: 'none' }}
                        >
                            <img
                                src="/img/chat_couple.jpg"
                                alt="Chat with friends"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <Box
                                position="absolute"
                                bottom={0}
                                left={0}
                                right={0}
                                bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                                p={8}
                                pt={20}
                            >
                                <VStack align="start" spacing={2}>
                                    <Badge
                                        bg="#FF8E53"
                                        color="white"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        fontSize="md"
                                    >
                                        NEW
                                    </Badge>
                                    <Heading color="white" fontSize="3xl">
                                        새로운 친구와 대화를 시작해보세요
                                    </Heading>
                                    <Text color="gray.200" fontSize="lg">
                                        나와 비슷한 관심사를 가진 친구들이 기다리고 있어요.
                                    </Text>
                                </VStack>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Market & Info Section */}
                <Box py={20} bg="white">
                    <Box maxW="1980px" mx="auto" px="200px">
                        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="80px">
                            {/* Mooa Market */}
                            <Box>
                                <Heading fontSize="2xl" color="gray.800" mb={2}>
                                    무아나눔
                                </Heading>
                                <Text color="gray.500" fontSize="lg" mb={8}>
                                    가까운 친구들과 함께 무료나눔하세요
                                </Text>
                                <Link to="/market" style={{ display: 'block' }}>
                                    <Box
                                        w="full"
                                        h="300px"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        boxShadow="md"
                                        transition="transform 0.3s"
                                        _hover={{ transform: 'scale(1.02)' }}
                                    >
                                        <img
                                            src="/img/market_intro.jpg"
                                            alt="무아나눔 소개"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                </Link>
                            </Box>

                            {/* Mooa Info */}
                            <Box>
                                <Heading fontSize="2xl" color="gray.800" mb={2}>
                                    무아정보
                                </Heading>
                                <Text color="gray.500" fontSize="lg" mb={8}>
                                    무아님들에게 필요한 정보를 확인하세요
                                </Text>
                                <SimpleGrid columns={3} gap={4}>
                                    {/* 1. 복지정책 - Navy */}
                                    <VStack
                                        bg="#1E3A5F"
                                        h="140px"
                                        justify="center"
                                        spacing={2}
                                        cursor="pointer"
                                        transition="transform 0.2s"
                                        _hover={{ transform: 'translateY(-5px)' }}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                        <Text color="white" fontWeight="bold">복지정책</Text>
                                    </VStack>

                                    {/* 2. 지자체소식 - Orange */}
                                    <VStack
                                        bg="#FF6B00"
                                        h="140px"
                                        justify="center"
                                        spacing={2}
                                        cursor="pointer"
                                        transition="transform 0.2s"
                                        _hover={{ transform: 'translateY(-5px)' }}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 21h18" />
                                            <path d="M5 21V7l8-4 8 4v14" />
                                            <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
                                        </svg>
                                        <Text color="white" fontWeight="bold">지자체소식</Text>
                                    </VStack>

                                    {/* 3. 병원정보 - Teal */}
                                    <VStack
                                        bg="#20C997"
                                        h="140px"
                                        justify="center"
                                        spacing={2}
                                        cursor="pointer"
                                        transition="transform 0.2s"
                                        _hover={{ transform: 'translateY(-5px)' }}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                                            <path d="M17 7V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3"></path>
                                            <line x1="12" y1="12" x2="12" y2="17"></line>
                                            <line x1="9" y1="14.5" x2="15" y2="14.5"></line>
                                        </svg>
                                        <Text color="white" fontWeight="bold">병원정보</Text>
                                    </VStack>

                                    {/* 4. 건강상식 - Light Teal */}
                                    <VStack
                                        bg="#4DB6AC"
                                        h="140px"
                                        justify="center"
                                        spacing={2}
                                        cursor="pointer"
                                        transition="transform 0.2s"
                                        _hover={{ transform: 'translateY(-5px)' }}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                        <Text color="white" fontWeight="bold">건강상식</Text>
                                    </VStack>

                                    {/* 5. 도서추천 - Yellow */}
                                    <VStack
                                        bg="#FFD43B"
                                        h="140px"
                                        justify="center"
                                        spacing={2}
                                        cursor="pointer"
                                        transition="transform 0.2s"
                                        _hover={{ transform: 'translateY(-5px)' }}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                        </svg>
                                        <Text color="white" fontWeight="bold">도서추천</Text>
                                    </VStack>

                                    {/* 6. 공연안내 - Coral */}
                                    <VStack
                                        bg="#FF8E53"
                                        h="140px"
                                        justify="center"
                                        spacing={2}
                                        cursor="pointer"
                                        transition="transform 0.2s"
                                        _hover={{ transform: 'translateY(-5px)' }}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 18V5l12-2v13"></path>
                                            <circle cx="6" cy="18" r="3"></circle>
                                            <circle cx="18" cy="16" r="3"></circle>
                                        </svg>
                                        <Text color="white" fontWeight="bold">공연안내</Text>
                                    </VStack>
                                </SimpleGrid>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Box>

                {/* Footer */}
            </Box>
            <Footer />
        </Box>
    );
};

export default LandingPage;
