import { useState, useEffect } from 'react';
import { Box, Heading, Text, Badge, Button, VStack, Flex, HStack, Dialog, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaRegEnvelope, FaComments, FaUsers, FaMapLocationDot } from "react-icons/fa6";
import Footer from '../components/Footer';
import KakaoMap from '../components/map/KakaoMap';

const Meetup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [selectedMeetup, setSelectedMeetup] = useState(null);
    const [meetups, setMeetups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mapCoords, setMapCoords] = useState({ lat: 37.566826, lng: 126.9786567 }); // 기본값: 서울시청
    const [mapLoading, setMapLoading] = useState(false);

    const handleOpenMap = (meetup) => {
        setSelectedMeetup(meetup);
        setMapLoading(true);
        setIsMapOpen(true);

        // 카카오맵 Places API를 사용하여 장소명/주소로 좌표 검색
        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
            const places = new window.kakao.maps.services.Places();

            // 키워드 검색 (장소명, 주소 모두 검색 가능)
            places.keywordSearch(meetup.location, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                    setMapCoords({
                        lat: parseFloat(result[0].y),
                        lng: parseFloat(result[0].x)
                    });
                    console.log('장소 검색 성공:', meetup.location, result[0]);
                } else {
                    // 키워드 검색 실패 시 주소 검색 시도
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.addressSearch(meetup.location, (geoResult, geoStatus) => {
                        if (geoStatus === window.kakao.maps.services.Status.OK) {
                            setMapCoords({
                                lat: parseFloat(geoResult[0].y),
                                lng: parseFloat(geoResult[0].x)
                            });
                        } else {
                            console.log('검색 실패, 기본 좌표 사용:', meetup.location);
                            setMapCoords({ lat: 37.566826, lng: 126.9786567 });
                        }
                        setMapLoading(false);
                    });
                    return;
                }
                setMapLoading(false);
            });
        } else {
            // 카카오맵 서비스가 로드되지 않은 경우
            console.log('카카오맵 서비스 미로드');
            setMapCoords({ lat: 37.566826, lng: 126.9786567 });
            setMapLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Fetch meetups from backend API
        const fetchMeetups = async () => {
            try {
                const response = await fetch('/api/meetups');
                if (response.ok) {
                    const data = await response.json();
                    // Transform backend data to match frontend structure
                    const transformedMeetups = data.map(meetup => ({
                        id: meetup.id,
                        title: meetup.title,
                        description: meetup.description || '',
                        location: meetup.location || '위치 미정',
                        date: meetup.date || '날짜 미정',
                        members: meetup.members || 0,
                        maxMembers: meetup.maxMembers || 10,
                        cost: meetup.cost || '무료',
                        transport: meetup.transport || '정보 없음',
                        startTime: meetup.startTime || '00:00',
                        endTime: meetup.endTime || '00:00',
                        image: meetup.image || '/img/hiking_meetup.png',
                        tags: meetup.tags ? meetup.tags.split(',') : ['모임'],
                        supplies: meetup.supplies || '없음',
                        category: meetup.category,
                        creatorUsername: meetup.creatorUsername,
                        creatorPhone: meetup.creatorPhone,
                        // Default coordinates for map (서울시청)
                        lat: 37.566826,
                        lng: 126.9786567
                    }));
                    setMeetups(transformedMeetups);
                }
            } catch (error) {
                console.error('Failed to fetch meetups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeetups();
    }, []);

    const isGuest = !user || user.username === 'Guest';

    const [selectedFilter, setSelectedFilter] = useState('전체');

    // 카테고리 필터링 로직
    const categoryMap = {
        '전체': null,
        '기타': 'GUITAR',
        '노래': 'SINGING',
        '댄스': 'DANCE',
        '독서': 'READING',
        '등산': 'HIKING',
        '뜨개질': 'KNITTING',
        '먹방': 'FOODIE',
        '바둑': 'BADUK',
        '사진': 'PHOTO',
        '스터디': 'STUDY',
        '여행': 'TRAVEL',
        '요리': 'COOKING',
        '장기': 'JANGGI',
        '친목': 'SOCIAL'
    };

    const filteredMeetups = meetups.filter(meetup => {
        if (selectedFilter === '전체') return true;
        return meetup.category === categoryMap[selectedFilter];
    });

    const displayMeetups = isGuest ? filteredMeetups.slice(0, 6) : filteredMeetups;

    // Helper to chunk array (Same logic as Match.jsx)
    const chunkArray = (arr, size) => {
        const chunked = [];
        for (let i = 0; i < arr.length; i += size) {
            chunked.push(arr.slice(i, i + size));
        }
        return chunked;
    };

    const meetupRows = chunkArray(displayMeetups, 3);
    const categories = ['전체', '기타', '노래', '댄스', '독서', '등산', '뜨개질', '먹방', '바둑', '사진', '스터디', '여행', '요리', '장기', '친목'];

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

                    {/* Filter Chips (Match 페이지와 동일한 녹색 디자인) */}
                    <Flex justify="center" gap={4} wrap="wrap" mb={24}>
                        {categories.map(cat => (
                            <Button
                                key={cat}
                                onClick={() => setSelectedFilter(cat)}
                                borderRadius="full"
                                px={6}
                                bg={selectedFilter === cat ? '#25D366' : 'white'}
                                color={selectedFilter === cat ? 'white' : 'gray.600'}
                                border="1px solid"
                                borderColor="gray.200"
                                _hover={{ bg: selectedFilter === cat ? '#25D366' : 'gray.50' }}
                            >
                                {cat}
                            </Button>
                        ))}
                    </Flex>

                    {/* Meetup Grid (Rows of 3) */}
                    <VStack align="stretch">
                        {loading ? (
                            <Flex justify="center" align="center" h="200px">
                                <Spinner size="xl" color="#25D366" />
                            </Flex>
                        ) : meetupRows.length === 0 ? (
                            <Box textAlign="center" py={10}>
                                <Text fontSize="lg" color="gray.500">현재 등록된 모임이 없습니다.</Text>
                            </Box>
                        ) : (
                            meetupRows.map((row, rowIndex) => (
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
                                                    bg={rowIndex === 0 ? "red.500" : "#25D366"}
                                                    color="white"
                                                    px={3}
                                                    py={1}
                                                    borderRadius="full"
                                                    fontSize="md"
                                                    boxShadow="md"
                                                >
                                                    {rowIndex === 0 ? "🏆 인기모임" : "모집중"}
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
                                                    <Button size="xs" ml={2} colorScheme="teal" variant="outline" onClick={() => handleOpenMap(meetup)}>
                                                        <FaMapLocationDot /> 지도 보기
                                                    </Button>
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

                                                <Text fontSize="sm" fontWeight="bold" color="#25D366" mb={1}>
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
                            ))
                        )}
                    </VStack>

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
                                    bg="#25D366"
                                    color="white"
                                    _hover={{ bg: "#20bd5a" }}
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

            {/* Map Modal */}
            <Dialog.Root open={isMapOpen} onOpenChange={(e) => setIsMapOpen(e.open)} size="xl" placement="center">
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{selectedMeetup?.title} 위치</Dialog.Title>
                            <Dialog.CloseTrigger />
                        </Dialog.Header>
                        <Dialog.Body pb={6}>
                            {selectedMeetup && (
                                mapLoading ? (
                                    <Flex justify="center" align="center" h="400px" bg="gray.100" borderRadius="lg">
                                        <VStack>
                                            <Spinner size="xl" color="#25D366" />
                                            <Text color="gray.500">지도를 불러오는 중...</Text>
                                        </VStack>
                                    </Flex>
                                ) : (
                                    <KakaoMap
                                        x={mapCoords.lng}
                                        y={mapCoords.lat}
                                        className="w-full h-[400px] rounded-lg"
                                        markerImage={{
                                            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                                            size: { width: 24, height: 35 }
                                        }}
                                    >
                                        <div style={{ padding: '5px', background: 'white', borderRadius: '4px', border: '1px solid #ccc' }}>
                                            {selectedMeetup.title}
                                        </div>
                                    </KakaoMap>
                                )
                            )}
                            <Text mt={4} fontSize="sm" color="gray.600">
                                📍 {selectedMeetup?.location}
                            </Text>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>

            <Footer />
        </Flex >
    );
};

export default Meetup;
