import { useState, useEffect } from 'react';
import { Box, Heading, Text, Badge, Button, VStack, Flex, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaRegEnvelope, FaComments, FaUsers } from "react-icons/fa6";
import Footer from '../components/Footer';

const Meetup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [meetups, setMeetups] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [loading, setLoading] = useState(true);

    // 카테고리 매핑 (한글 -> API 파라미터)
    const categoryMap = {
        '전체': 'ALL',
        '운동/건강': 'EXERCISE_HEALTH',
        '문화/예술': 'CULTURE_ART',
        '여행': 'TRAVEL',
        '봉사활동': 'VOLUNTEER'
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // API에서 모임 데이터 불러오기
    useEffect(() => {
        fetchMeetups(selectedCategory);
    }, [selectedCategory]);

    const fetchMeetups = async (category) => {
        setLoading(true);
        try {
            const categoryParam = categoryMap[category] || 'ALL';
            const response = await fetch(`http://localhost:9999/api/meetups?category=${categoryParam}`);
            if (response.ok) {
                const data = await response.json();
                // tags 문자열을 배열로 변환
                const processedData = data.map(meetup => ({
                    ...meetup,
                    tags: meetup.tags ? meetup.tags.split(',') : []
                }));
                setMeetups(processedData);
            } else {
                console.error('Failed to fetch meetups');
                setMeetups([]);
            }
        } catch (error) {
            console.error('Error fetching meetups:', error);
            setMeetups([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const isGuest = !user || user.username === 'Guest';

    const displayMeetups = isGuest ? meetups.slice(0, 6) : meetups;

    // Helper to chunk array (Same logic as Match.jsx)
    const chunkArray = (arr, size) => {
        const chunked = [];
        for (let i = 0; i < arr.length; i += size) {
            chunked.push(arr.slice(i, i + size));
        }
        return chunked;
    };

    const meetupRows = chunkArray(displayMeetups, 3);

    return (
        <Flex direction="column" minH="100vh">
            <Box maxW="1980px" mx="auto" px="200px" py={10} flex="1" w="full">
                <VStack spacing={10} align="stretch">
                    {/* Header */}
                    <Box textAlign="center" mb={10}>
                        <Heading as="h1" size="2xl" mb={4} color="var(--mooa-navy)">
                            모임하기
                        </Heading>
                        <Text fontSize="xl" color="gray.600">
                            {isGuest
                                ? "회원가입 후 로그인하고 다양한 취미 모임을 참여하세요!"
                                : "비슷한 취미를 가진 친구들과 함께 모임을 만들어보세요."}
                        </Text>
                    </Box>

                    {/* Filter Chips */}
                    <Flex justify="center" gap={4} wrap="wrap" mb={24}>
                        {['전체', '운동/건강', '문화/예술', '여행', '봉사활동'].map(cat => (
                            <Button
                                key={cat}
                                colorScheme={cat === selectedCategory ? "blue" : "gray"}
                                bg={cat === selectedCategory ? "var(--mooa-navy)" : "transparent"}
                                color={cat === selectedCategory ? "white" : "gray.600"}
                                variant={cat === selectedCategory ? "solid" : "outline"}
                                borderRadius="full"
                                px={6}
                                _hover={{
                                    bg: cat === selectedCategory ? "var(--mooa-navy)" : "gray.100",
                                    transform: 'scale(1.05)',
                                    boxShadow: 'md',
                                    borderColor: 'gray.400'
                                }}
                                transition="all 0.2s ease-in-out"
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </Flex>

                    {/* Loading State */}
                    {loading && (
                        <Box textAlign="center" py={10}>
                            <Text fontSize="lg" color="gray.500">모임을 불러오는 중...</Text>
                        </Box>
                    )}

                    {/* Meetup Grid (Rows of 3) */}
                    {!loading && (
                        <VStack align="stretch">
                            {meetupRows.map((row, rowIndex) => (
                                <Flex
                                    key={rowIndex}
                                    mb="75px"
                                    direction={{ base: 'column', lg: 'row' }}
                                    gap="40px"
                                    align="stretch"
                                    justify="center"
                                    position="relative"
                                >
                                    {row.map((meetup) => (
                                        <Box
                                            key={meetup.id}
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
                                            {/* Image Area */}
                                            <Box h="280px" bg="gray.100" position="relative">
                                                <img
                                                    src={meetup.image}
                                                    alt={meetup.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Meetup'; }}
                                                />
                                                <Badge
                                                    position="absolute"
                                                    top={4}
                                                    right={4}
                                                    bg={meetup.members >= 15 ? "red.500" : "var(--mooa-orange)"}
                                                    color="white"
                                                    px={3}
                                                    py={1}
                                                    borderRadius="full"
                                                    fontSize="md"
                                                    boxShadow="md"
                                                >
                                                    {meetup.members >= 15 ? "🏆 인기모임" : "모집중"}
                                                </Badge>
                                            </Box>

                                            {/* Content Area */}
                                            <Box p={6}>
                                                <Flex align="center" justify="space-between" mb={2}>
                                                    <Text fontSize="24px" fontWeight="bold" color="gray.800">
                                                        {meetup.title}
                                                    </Text>
                                                </Flex>

                                                <Text color="gray.500" fontSize="md" mb={1}>
                                                    📍 {isGuest ? meetup.location.split(' ')[0] + ' ***' : meetup.location}
                                                </Text>
                                                <Text color="gray.500" fontSize="md" mb={4}>
                                                    📅 {meetup.date} ({meetup.startTime} ~ {meetup.endTime})
                                                </Text>

                                                <Text color="gray.600" mb={6} noOfLines={2} h="3em">
                                                    {meetup.description}
                                                </Text>

                                                <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1}>
                                                    회비: {meetup.cost}
                                                </Text>

                                                <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1}>
                                                    출발지: {meetup.transport}
                                                </Text>

                                                <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1}>
                                                    준비물: {meetup.supplies}
                                                </Text>

                                                <Text fontSize="sm" fontWeight="bold" color="var(--mooa-orange)" mb={1}>
                                                    현재 {meetup.members}명 / 정원 {meetup.maxMembers}명
                                                </Text>

                                                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
                                                    모임 태그
                                                </Text>
                                                <HStack spacing={2} mb={6}>
                                                    {meetup.tags && meetup.tags.map(tag => (
                                                        <Box key={tag} px={2} py={1} bg="blue.50" color="blue.600" borderRadius="full" fontSize="sm" fontWeight="medium">
                                                            #{tag}
                                                        </Box>
                                                    ))}
                                                </HStack>

                                                <Button
                                                    w="full"
                                                    size="lg"
                                                    bg="var(--mooa-navy)"
                                                    color="white"
                                                    _hover={{ opacity: 0.9 }}
                                                    onClick={() => isGuest ? navigate('/login') : alert('참여 신청이 완료되었습니다!')}
                                                    justifyContent="center"
                                                >
                                                    <Flex w="100%" align="center" justify="space-between">
                                                        <Text>{isGuest ? "로그인하고 참여하기" : `참여하기 (${meetup.members}명)`}</Text>
                                                        <Flex align="center">
                                                            <Box w="1px" h="16px" bg="whiteAlpha.400" mx={4} />
                                                            <FaUsers />
                                                        </Flex>
                                                    </Flex>
                                                </Button>
                                                <Button
                                                    w="full"
                                                    size="lg"
                                                    bg="gray.500"
                                                    color="white"
                                                    mt={2}
                                                    _hover={{ opacity: 0.9 }}
                                                    onClick={() => alert('모임장에게 문자를 보낼 준비가 되었습니다.')}
                                                    justifyContent="center"
                                                >
                                                    <Flex w="100%" align="center" justify="space-between">
                                                        <Text>모임회장에게 문자 보내기</Text>
                                                        <Flex align="center">
                                                            <Box w="1px" h="16px" bg="whiteAlpha.400" mx={4} />
                                                            <FaComments />
                                                        </Flex>
                                                    </Flex>
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))}
                                </Flex>
                            ))}
                        </VStack>
                    )}

                    {/* Empty State */}
                    {!loading && meetups.length === 0 && (
                        <Box textAlign="center" py={10}>
                            <Text fontSize="lg" color="gray.500">해당 카테고리의 모임이 없습니다.</Text>
                        </Box>
                    )}

                    {isGuest && (
                        <Box
                            mt="75px"
                            textAlign="center"
                            p={8}
                            borderRadius="2xl"
                            position="relative"
                            overflow="hidden"
                            bg="gray.900"
                            backgroundImage="url('/img/meetup_banner_new.jpg')"
                            backgroundSize="cover"
                            backgroundPosition="center 60%"
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
                                <Heading size="lg" mb={2} color="white">모임에 참여하고 친구를 만들어보세요!</Heading>
                                <Text color="whiteAlpha.900" mb={6}>간단하게 가입하고 내 취향에 딱 맞는 모임에 참여해보세요.</Text>
                                <Button
                                    bg="var(--mooa-orange)"
                                    color="white"
                                    _hover={{ bg: "#d65a00" }}
                                    onClick={() => navigate('/signup')}
                                    size="lg"
                                    px={8}
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

export default Meetup;
