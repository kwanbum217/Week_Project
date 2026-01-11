import { useState, useEffect } from 'react';
import { Box, Heading, Text, Badge, Button, VStack, Flex, HStack, Dialog, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaRegEnvelope, FaComments, FaUsers, FaMapLocationDot } from "react-icons/fa6";
import Footer from '../components/Footer';
import KakaoMap from '../components/map/KakaoMap';

const Meetup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedMeetup, setSelectedMeetup] = useState(null);

    const handleOpenMap = (meetup) => {
        setSelectedMeetup(meetup);
        onOpen();
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const isGuest = !user || user.username === 'Guest';

    // Temporary dummy data for meetups
    const meetups = [
        {
            id: 3,
            title: '사진 촬영 출사',
            description: '풍경 사진 찍으러 같이 가요.',
            location: '서울 전체',
            date: '비정기적',
            members: 24,
            maxMembers: 30,
            cost: "회비 10,000원",
            transport: "카풀 가능",
            startTime: "13:00",
            endTime: "18:00",
            image: '/img/photo_meetup.png',
            tags: ['사진', '예술', '여행'],
            supplies: '개인 카메라, 삼각대(선택)',
            lat: 37.566826,
            lng: 126.9786567
        },
        {
            id: 1,
            title: '주말 등산 모임',
            description: '함께 관악산 등산하실 분 구합니다. 초보자 환영!',
            location: '서울 관악구',
            date: '매주 토요일 오전 9시',
            members: 15,
            maxMembers: 20,
            cost: "참가비 무료",
            transport: "대중교통 권장",
            startTime: "09:00",
            endTime: "13:00",
            image: '/img/hiking_meetup.png',
            tags: ['등산', '건강', '친목'],
            supplies: '등산화, 물, 간단한 간식',
            lat: 37.4449168,
            lng: 126.9632669
        },
        {
            id: 5,
            title: '맛집 탐방대',
            description: '숨겨진 맛집을 찾아 떠나는 미식 여행!',
            location: '서울 홍대/합정',
            date: '매주 금요일 저녁',
            members: 12,
            maxMembers: 20,
            cost: "식비 1/N",
            transport: "홍대입구역 3번 출구",
            startTime: "19:00",
            endTime: "21:30",
            image: '/img/gourmet_meetup.png',
            tags: ['맛집', '먹방', '불금'],
            supplies: '즐거운 마음, 회비',
            lat: 37.557527,
            lng: 126.9244669
        },
        {
            id: 2,
            title: '강남 독서 토론',
            description: '한 달에 한 권, 깊이 있는 대화를 나눕니다.',
            location: '서울 강남구',
            date: '매월 첫째 주 일요일',
            members: 8,
            maxMembers: 10,
            cost: "카페비 각자 부담",
            transport: "주차 가능 (2시간 무료)",
            startTime: "15:00",
            endTime: "17:00",
            image: '/img/book_club_meetup.png',
            tags: ['독서', '토론', '교양'],
            supplies: '이달의 선정 도서, 필기도구',
            lat: 37.497942,
            lng: 127.027621
        },
        {
            id: 6,
            title: '클래식 음악 감상',
            description: '다같이 모여서 클래식 명곡을 감상해요.',
            location: '서울 서초구',
            date: '격주 일요일 오후',
            members: 6,
            maxMembers: 8,
            cost: "티켓비 실비",
            transport: "남부터미널역 5분 거리",
            startTime: "14:00",
            endTime: "16:30",
            image: '/img/classic_music_meetup.png',
            tags: ['음악', '클래식', '힐링'],
            supplies: '편안한 복장',
            lat: 37.484085,
            lng: 127.013009
        },
        {
            id: 4,
            title: '동네 산책 모임',
            description: '저녁 드시고 가볍게 산책해요.',
            location: '서울 마포구',
            date: '매일 저녁 8시',
            members: 5,
            maxMembers: 10,
            cost: "참가비 무료",
            transport: "망원한강공원 주차장",
            startTime: "20:00",
            endTime: "21:30",
            image: '/img/neighborhood_walk.png',
            tags: ['산책', '운동', '동네'],
            supplies: '운동화, 물',
            lat: 37.556790,
            lng: 126.901538
        }
    ];

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

                    {/* Filter Chips (Visual only for consistency) */}
                    <Flex justify="center" gap={4} wrap="wrap" mb={24}>
                        {['전체', '운동/건강', '문화/예술', '여행', '봉사활동'].map(cat => (
                            <Button
                                key={cat}
                                colorScheme={cat === '전체' ? "blue" : "gray"}
                                bg={cat === '전체' ? "var(--mooa-navy)" : "transparent"}
                                color={cat === '전체' ? "white" : "gray.600"}
                                variant={cat === '전체' ? "solid" : "outline"}
                                borderRadius="full"
                                px={6}
                                _hover={{ bg: cat === '전체' ? "var(--mooa-navy)" : "gray.100" }}
                            >
                                {cat}
                            </Button>
                        ))}
                    </Flex>

                    {/* Meetup Grid (Rows of 3) */}
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
                        ))}
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
            {/* Map Modal */}
            <Dialog.Root open={isOpen} onOpenChange={onClose} size="xl" placement="center">
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{selectedMeetup?.title} 위치</Dialog.Title>
                            <Dialog.CloseTrigger />
                        </Dialog.Header>
                        <Dialog.Body pb={6}>
                            {selectedMeetup && (
                                <KakaoMap
                                    x={selectedMeetup.lng}
                                    y={selectedMeetup.lat}
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
