import { useState } from 'react';
import { Box, Container, Heading, Text, SimpleGrid, VStack, Icon, Flex, Image } from '@chakra-ui/react';
import { FaUserFriends, FaLandmark, FaHospital, FaStethoscope, FaBook, FaMusic, FaMapMarkerAlt, FaTrophy, FaHandHoldingHeart, FaNewspaper } from 'react-icons/fa';
import BmiTool from '../components/BmiTool';
import VitalTool from '../components/VitalTool';
import ExerciseTool from '../components/ExerciseTool';
import Footer from '../components/Footer';

const CategoryCard = ({ title, icon, color, bg, textColor = 'gray.700', onClick, isSelected, iconSize = 5 }) => (
    <Flex
        direction="column"
        align="center"
        justify="center"
        bg={bg}
        p={2}
        borderRadius="xl"
        cursor="pointer"
        transition="all 0.2s"
        transform={isSelected ? 'scale(1.05)' : 'scale(1)'}
        boxShadow={isSelected ? 'lg' : 'sm'}
        border="2px solid"
        borderColor={isSelected ? color : 'transparent'}
        _hover={{ transform: 'translateY(-5px)', shadow: 'md' }}
        onClick={onClick}
        h="72px"
    >
        <Icon as={icon} w={iconSize} h={iconSize} mb={1} color={color} />
        <Heading size="md" color={textColor} fontWeight="bold" fontSize="md">
            {title}
        </Heading>
    </Flex>
);

const InfoCard = ({ info }) => (
    <Box
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="xl"
        overflow="hidden"
        bg="white"
        transition="all 0.2s"
        _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
        cursor="pointer"
    >
        <Box h="200px" overflow="hidden" bg="gray.100">
            <Image
                src={info.image}
                alt={info.title}
                w="100%"
                h="100%"
                objectFit="cover"
                fallback={<Flex h="full" align="center" justify="center" color="gray.400">이미지 준비중</Flex>}
            />
        </Box>
        <Flex direction="column" align="start" p={6}>
            <Box
                px={3}
                py={1}
                bg="blue.50"
                color="blue.600"
                borderRadius="full"
                fontSize="xs"
                fontWeight="bold"
                mb={3}
            >
                {info.category}
            </Box>
            <Text
                as="h3"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.800"
                noOfLines={2}
                lineHeight="1.5"
                mb={2}
                w="full"
            >
                {info.title}
            </Text>
            <Text fontSize="sm" color="gray.600" noOfLines={2} w="full" lineHeight="1.5">
                {info.summary}
            </Text>
            <Text fontSize="xs" color="gray.400" w="full" textAlign="right" pt={2} mt="auto">
                {info.date}
            </Text>
        </Flex>
    </Box>
);

const Info = () => {
    const [selectedCategory, setSelectedCategory] = useState('최신정보');

    const categoryConfig = [
        { id: '최신정보', icon: FaNewspaper, bg: '#E53E3E', iconColor: 'white', textColor: 'white' }, // Red
        { id: '복지정책', icon: FaUserFriends, bg: '#1E3A5F', iconColor: 'white', textColor: 'white', iconSize: 7 }, // Navy, larger icon
        { id: '지자체소식', icon: FaLandmark, bg: '#FF6B00', iconColor: 'white', textColor: 'white' }, // Orange
        { id: '병원정보', icon: FaHospital, bg: '#20C997', iconColor: 'white', textColor: 'white' }, // Teal
        { id: '건강상식', icon: FaStethoscope, bg: '#4DB6AC', iconColor: 'white', textColor: 'white' }, // Light Teal
        { id: '도서추천', icon: FaBook, bg: '#FFD43B', iconColor: 'white', textColor: 'white' }, // Yellow (White text/icon)
        { id: '공연안내', icon: FaMusic, bg: '#FF8E53', iconColor: 'white', textColor: 'white' }, // Coral
    ];

    const allInfos = [
        {
            id: 1,
            title: '2025년 기초연금 인상 안내',
            summary: '내년부터 월 33만원 지급, 선정 기준액도 완화됩니다.',
            category: '복지정책',
            date: '2025-01-02',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 2,
            title: '우리구 무료 독감 예방접종',
            summary: '1월 말까지 보건소에서 65세 이상 무료 접종을 실시합니다.',
            category: '지자체소식',
            date: '2025-01-05',
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 3,
            title: '야간/휴일 진료 병원 찾기',
            summary: '명절 연휴에도 문 여는 우리 동네 병원 리스트.',
            category: '병원정보',
            date: '2025-01-08',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 4,
            title: '혈당을 낮추는 생활 습관 5가지',
            summary: '식사 순서만 바꿔도 혈당 스파이크를 막을 수 있습니다.',
            category: '건강상식',
            date: '2025-01-10',
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 5,
            title: '다시 읽는 한국 문학 걸작선',
            summary: '박경리, 황석영 등 거장들의 작품을 큰 글씨로 만나보세요.',
            category: '도서추천',
            date: '2025-01-12',
            image: '/img/book_club_meetup.png'
        },
        {
            id: 6,
            title: '신년맞이 국악 한마당',
            summary: '문화예술회관 대강당에서 펼쳐지는 흥겨운 국악 공연.',
            category: '공연안내',
            date: '2025-01-15',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600'
        }
    ];

    // Online Bookstore Links
    const bookstores = [
        { name: '교보문고', url: 'https://www.kyobobook.co.kr/', color: '#474C98', logo: 'https://contents.kyobobook.co.kr/resources/fo/images/common/ink/img_logo_kyobo@2x.png', desc: '대한민국 대표 온/오프라인 서점' }, // Kyobo Navy
        { name: '예스24', url: 'https://www.yes24.com/', color: '#196AB3', logo: 'https://image.yes24.com/images/00_Event/2025/logoplay/ani_logo_PC_2026NEWYEAR.gif?v=20251231', desc: '대한민국 1등 인터넷 서점' }, // Yes24 Blue
        { name: '알라딘', url: 'https://www.aladin.co.kr/', color: '#EB5B5B', logo: 'https://image.aladin.co.kr/img/header/2011/aladin_logo_new.gif', desc: '좋은 책을 고르는 방법, 알라딘' }, // Aladin Red
    ];

    const filteredInfos = selectedCategory === '전체' || selectedCategory === '최신정보'
        ? allInfos
        : allInfos.filter(info => info.category === selectedCategory);

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Box flex="1">
                {/* Hero Section - Matching LandingPage style */}
                <Box pt={0} position="relative" overflow="hidden">
                    {/* 배경 장식 */}
                    <div className="absolute inset-0 pointer-events-none -z-10">
                        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-100/50 blur-3xl animate-float-gentle" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
                    </div>

                    <Box maxW="1980px" mx="auto" px="200px" py={8}>
                        <VStack spacing={8} textAlign="center" alignItems="center">
                            <Box className="animate-fade-in">
                                <Heading
                                    as="h1"
                                    fontSize={{ base: "4xl", md: "6xl" }}
                                    fontWeight="900"
                                    lineHeight="1.2"
                                    color="var(--mooa-navy)"
                                    mb={6}
                                >
                                    무아정보
                                </Heading>
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="var(--mooa-text-secondary)"
                                    maxW="2xl"
                                    mx="auto"
                                    mb={10}
                                >
                                    유익한 정보를 한눈에 확인하세요.
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                </Box>

                {/* Content Section */}
                <Box maxW="1980px" mx="auto" px="200px" py={10}>
                    <VStack spacing={0} align="stretch">
                        {/* Latest Info Banner */}
                        <Box mb="20px" onClick={() => setSelectedCategory('최신정보')} cursor="pointer" maxW="50%" mx="auto">
                            <Flex
                                justify="center"
                                align="center"
                                bg="#E53E3E"
                                p={4}
                                borderRadius="xl"
                                boxShadow={selectedCategory === '최신정보' ? 'lg' : 'sm'}
                                transform={selectedCategory === '최신정보' ? 'scale(1.02)' : 'scale(1)'}
                                transition="all 0.2s"
                                _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                                border="2px solid"
                                borderColor={selectedCategory === '최신정보' ? '#E53E3E' : 'transparent'}
                            >
                                <Icon as={FaNewspaper} w={6} h={6} color="white" mr={3} />
                                <Heading size="md" color="white">
                                    최신정보
                                </Heading>
                            </Flex>
                        </Box>

                        <SimpleGrid columns={{ base: 3, md: 3, lg: 6 }} gap="15px" mb="50px">
                            {categoryConfig.filter(cat => cat.id !== '최신정보').map((cat) => (
                                <CategoryCard
                                    key={cat.id}
                                    title={cat.id}
                                    icon={cat.icon}
                                    bg={cat.bg}
                                    color={cat.iconColor}
                                    textColor={cat.textColor}
                                    isSelected={selectedCategory === cat.id}
                                    iconSize={cat.iconSize}
                                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? '전체' : cat.id)}
                                />
                            ))}
                        </SimpleGrid>

                        <Box>
                            {selectedCategory !== '최신정보' && selectedCategory !== '전체' && (
                                <Heading size="md" mb={6} color="gray.700">
                                    {`${selectedCategory} 모아보기`}
                                </Heading>
                            )}
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingX="40px" spacingY="75px">
                                {filteredInfos.map((info) => (
                                    <InfoCard key={info.id} info={info} />
                                ))}
                            </SimpleGrid>
                        </Box>

                        {/* Welfare Links Section (Only for Welfare Policy) */}
                        {selectedCategory === '복지정책' && (
                            <Box py={10} px={6} bg="gray.50" borderRadius="xl" my={10}>
                                <VStack spacing="50px">
                                    <Heading size="md" color="gray.700" textAlign="center">
                                        주요 복지 서비스 바로가기
                                    </Heading>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="50px" w="full" maxW="5xl">
                                        {[
                                            { name: '복지로', url: 'https://www.bokjiro.go.kr', icon: FaHandHoldingHeart, desc: '다양한 복지 혜택을 한눈에 확인하세요' },
                                            { name: '보조금24 (정부24)', url: 'https://www.gov.kr/portal/rcvfvrSvc/main', icon: FaLandmark, desc: '내가 받을 수 있는 모든 국가보조금 찾기' },
                                            { name: '보건복지부', url: 'https://www.mohw.go.kr', icon: FaHospital, desc: '보건복지 정책 및 주요 소식 안내' },
                                        ].map((site) => (
                                            <Flex
                                                key={site.name}
                                                as="a"
                                                href={site.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                direction="column"
                                                align="center"
                                                justify="center"
                                                bg="white"
                                                p={6}
                                                borderRadius="xl"
                                                borderWidth="1px"
                                                borderColor="gray.200"
                                                transition="all 0.2s"
                                                _hover={{ transform: 'translateY(-5px)', shadow: 'md', borderColor: 'blue.300' }}
                                                cursor="pointer"
                                                textAlign="center"
                                                gap={3}
                                                h="100%"
                                            >
                                                <Icon as={site.icon} w={10} h={10} color="blue.500" mb={1} />
                                                <VStack spacing={1}>
                                                    <Text fontWeight="bold" fontSize="lg" color="gray.800">
                                                        {site.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.500" px={2}>
                                                        {site.desc}
                                                    </Text>
                                                </VStack>
                                            </Flex>
                                        ))}
                                    </SimpleGrid>
                                </VStack>
                            </Box>
                        )}

                        {/* Local Welfare Links Section (Only for Local Gov News) */}
                        {selectedCategory === '지자체소식' && (
                            <Box py={10} px={6} bg="gray.50" borderRadius="xl" my={10}>
                                <VStack spacing="40px">
                                    <Heading size="md" color="gray.700" textAlign="center">
                                        지자체별 복지 소식 바로가기
                                    </Heading>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px" w="full" maxW="5xl">
                                        {[
                                            { name: '서울복지포털 (서울)', url: 'https://wis.seoul.go.kr', icon: FaMapMarkerAlt, desc: '서울특별시 복지 서비스 및 정책 안내' },
                                            { name: '경기복지플랫폼 (경기)', url: 'https://www.ggwf.or.kr', icon: FaUserFriends, desc: '경기도민을 위한 맞춤형 복지 정보' },
                                            { name: '우리동네 복지 찾기 (복지로)', url: 'https://www.bokjiro.go.kr/ssis-teu/index.do', icon: FaHandHoldingHeart, desc: '전국 시/군/구별 복지 서비스 검색' },
                                        ].map((site) => (
                                            <Flex
                                                key={site.name}
                                                as="a"
                                                href={site.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                direction="column"
                                                align="center"
                                                justify="center"
                                                bg="white"
                                                p={6}
                                                borderRadius="xl"
                                                borderWidth="1px"
                                                borderColor="gray.200"
                                                transition="all 0.2s"
                                                _hover={{ transform: 'translateY(-5px)', shadow: 'md', borderColor: 'green.300' }}
                                                cursor="pointer"
                                                textAlign="center"
                                                gap={3}
                                                h="100%"
                                            >
                                                <Icon as={site.icon} w={10} h={10} color="green.500" mb={1} />
                                                <VStack spacing={1}>
                                                    <Text fontWeight="bold" fontSize="lg" color="gray.800">
                                                        {site.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.500" px={2}>
                                                        {site.desc}
                                                    </Text>
                                                </VStack>
                                            </Flex>
                                        ))}
                                    </SimpleGrid>
                                </VStack>
                            </Box>
                        )}

                        {/* Online Bookstore Links Section (Only for Book Recommendation) */}
                        {selectedCategory === '도서추천' && (
                            <Box py={10} px={6} bg="gray.50" borderRadius="xl" my={10}>
                                <VStack spacing="50px">
                                    <Heading size="md" color="gray.700" textAlign="center">
                                        온라인 서점에서 책 살펴보기
                                    </Heading>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="50px" w="full" maxW="5xl">
                                        {bookstores.map((store) => (
                                            <Flex
                                                key={store.name}
                                                as="a"
                                                href={store.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                direction="column"
                                                align="center"
                                                justify="center"
                                                bg="white"
                                                p={6}
                                                borderRadius="xl"
                                                borderWidth="1px"
                                                borderColor="gray.200"
                                                transition="all 0.2s"
                                                _hover={{
                                                    transform: 'translateY(-5px)',
                                                    shadow: 'md',
                                                    borderColor: store.color
                                                }}
                                                cursor="pointer"
                                                textAlign="center"
                                                gap={3}
                                                h="100%"
                                            >
                                                <Image
                                                    src={store.logo}
                                                    alt={store.name}
                                                    h="40px"
                                                    objectFit="contain"
                                                    mb={1}
                                                />
                                                <VStack spacing={1}>
                                                    <Text
                                                        color={store.color}
                                                        fontWeight="bold"
                                                        fontSize="lg"
                                                    >
                                                        {store.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.500" px={2}>
                                                        {store.desc}
                                                    </Text>
                                                </VStack>
                                            </Flex>
                                        ))}
                                    </SimpleGrid>
                                </VStack>
                            </Box>
                        )}

                        {/* Health Tools Section (Only for Health Knowledge) */}
                        {selectedCategory === '건강상식' && (
                            <Box py={10} px={6} bg="gray.50" borderRadius="xl" my={10}>
                                <VStack spacing="50px">
                                    <Heading size="md" color="gray.700" textAlign="center">
                                        나의 건강 관리
                                    </Heading>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px" w="full" maxW="6xl">
                                        <BmiTool />
                                        <VitalTool />
                                        <ExerciseTool />
                                    </SimpleGrid>
                                </VStack>
                            </Box>
                        )}

                        {/* University Hospitals & Top 10 List (Only for Hospital Info) */}
                        {selectedCategory === '병원정보' && (
                            <Box py={10} px={6} bg="gray.50" borderRadius="xl" my={10}>
                                <VStack spacing="100px">

                                    {/* 1. Regional Hospitals Section */}
                                    <Box w="full" maxW="6xl">
                                        <Heading size="md" color="gray.700" textAlign="center" mb={10}>
                                            <Flex justify="center" align="center" gap={2}>
                                                <Icon as={FaMapMarkerAlt} color="teal.500" />
                                                광역별 대학/거점 병원
                                            </Flex>
                                        </Heading>
                                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
                                            {[
                                                { city: '부산광역시', name: '부산대학교병원', desc: '동남권 대표 거점 국립대병원', url: 'https://www.pnuh.or.kr' },
                                                { city: '대구광역시', name: '경북대학교병원', desc: '대구·경북 지역 거점 국립대병원', url: 'http://knuh.kr' },
                                                { city: '인천광역시', name: '가천대 길병원', desc: '인천 권역 책임 의료기관 (국립대병원 대행)', url: 'http://www.gilhospital.com' },
                                                { city: '광주광역시', name: '전남대학교병원', desc: '광주·전남 지역 거점 국립대병원', url: 'https://www.cnuh.com' },
                                                { city: '대전광역시', name: '충남대학교병원', desc: '대전·충청 지역 거점 국립대병원', url: 'https://www.cnuh.co.kr' },
                                                { city: '울산광역시', name: '울산대학교병원', desc: '울산 지역 거점 교육협력병원', url: 'https://www.uuh.ulsan.kr' },
                                            ].map((hospital) => (
                                                <Flex
                                                    key={hospital.city}
                                                    as="a"
                                                    href={hospital.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    bg="white"
                                                    p={5}
                                                    borderRadius="xl"
                                                    borderWidth="1px"
                                                    borderColor="teal.100"
                                                    align="start"
                                                    direction="column"
                                                    boxShadow="sm"
                                                    _hover={{ shadow: 'md', borderColor: 'teal.300', transform: 'translateY(-2px)' }}
                                                    transition="all 0.2s"
                                                    cursor="pointer"
                                                >
                                                    <Text fontSize="xs" fontWeight="bold" color="teal.600" mb={1} bg="teal.50" px={2} py={0.5} borderRadius="md" display="inline-block">
                                                        {hospital.city}
                                                    </Text>
                                                    <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={1}>
                                                        {hospital.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.500">
                                                        {hospital.desc}
                                                    </Text>
                                                </Flex>
                                            ))}
                                        </SimpleGrid>
                                    </Box>

                                    {/* 2. Top 10 Hospitals Section */}
                                    <Box w="full" maxW="4xl">
                                        <Heading size="md" color="gray.700" textAlign="center" mb={2}>
                                            <Flex justify="center" align="center" gap={2}>
                                                <Icon as={FaTrophy} color="gold" />
                                                대한민국 의료기관 순위 TOP 10
                                            </Flex>
                                        </Heading>
                                        <Text fontSize="sm" color="gray.500" textAlign="center" mb={10}>
                                            2025 뉴스위크(Newsweek) 세계 병원 평가 기준
                                        </Text>

                                        <SimpleGrid columns={1} spacingY="15px">
                                            {[
                                                { rank: 1, name: '서울아산병원', globalRank: '세계 25위', specialty: '암병원, 장기이식, 심장내과', url: 'http://www.amc.seoul.kr' },
                                                { rank: 2, name: '삼성서울병원', globalRank: '세계 30위', specialty: '암병원, 심장뇌혈관, 소아청소년과', url: 'https://www.samsunghospital.com' },
                                                { rank: 3, name: '서울대학교병원', globalRank: '세계 42위', specialty: '암병원, 어린이병원, 신경외과', url: 'http://www.snuh.org' },
                                                { rank: 4, name: '세브란스병원 (연세대)', globalRank: '세계 46위', specialty: '로봇수술, 암병원, 심장혈관', url: 'https://www.severance.healthcare' },
                                                { rank: 5, name: '분당서울대학교병원', globalRank: '세계 68위', specialty: '암병원, 노인보건, 뇌신경', url: 'https://www.snubh.org' },
                                                { rank: 6, name: '강남세브란스병원', globalRank: '세계 87위', specialty: '척추, 치과, 갑상선암', url: 'https://gs.severance.healthcare' },
                                                { rank: 7, name: '아주대학교병원', globalRank: '세계 103위', specialty: '권역외상센터, 암센터', url: 'http://hosp.ajoumc.or.kr' },
                                                { rank: 8, name: '서울성모병원 (가톨릭대)', globalRank: '세계 108위', specialty: '혈액병원, 안센터, 로봇수술', url: 'https://www.cmc.catholic.ac.kr/seoul' },
                                                { rank: 9, name: '인하대학교병원', globalRank: '세계 139위', specialty: '권역응급센터, 소화기센터', url: 'https://www.inha.com' },
                                                { rank: 10, name: '경희대학교병원', globalRank: '세계 171위', specialty: '한방병원 협진, 소화기센터', url: 'https://www.khmc.or.kr' },
                                            ].map((hospital) => (
                                                <Flex
                                                    key={hospital.rank}
                                                    as="a"
                                                    href={hospital.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    align="center"
                                                    bg="white"
                                                    p={3}
                                                    borderRadius="lg"
                                                    borderBottomWidth="2px"
                                                    borderBottomColor={hospital.rank <= 3 ? "yellow.400" : "gray.100"}
                                                    cursor="pointer"
                                                    _hover={{ bg: "gray.50" }}
                                                    transition="background 0.2s"
                                                >
                                                    <Flex
                                                        w="32px"
                                                        h="32px"
                                                        align="center"
                                                        justify="center"
                                                        bg={hospital.rank <= 3 ? "yellow.400" : "gray.100"}
                                                        color={hospital.rank <= 3 ? "white" : "gray.600"}
                                                        borderRadius="full"
                                                        fontWeight="bold"
                                                        mr={3}
                                                        flexShrink={0}
                                                    >
                                                        {hospital.rank}
                                                    </Flex>
                                                    <Text fontWeight="medium" color="gray.800" mr={2}>
                                                        {hospital.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="blue.500" fontWeight="normal" mr="auto">
                                                        ({hospital.specialty})
                                                    </Text>
                                                    <Text fontSize="xs" color="gray.400" whiteSpace="nowrap">
                                                        {hospital.globalRank}
                                                    </Text>
                                                </Flex>
                                            ))}
                                        </SimpleGrid>
                                        <Text fontSize="xs" color="gray.400" textAlign="right" mt={4}>
                                            * 출처: Newsweek World's Best Hospitals 2025
                                        </Text>
                                    </Box>

                                </VStack>
                            </Box>
                        )}

                        {/* Performance Links Section (Only for Performance Guide) */}
                        {selectedCategory === '공연안내' && (
                            <Box py={10} px={6} bg="gray.50" borderRadius="xl" my={10}>
                                <VStack spacing="50px">
                                    <Heading size="md" color="gray.700" textAlign="center">
                                        공연 예술 관련 주요 사이트
                                    </Heading>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px" w="full" maxW="5xl">
                                        {[
                                            { name: 'KOPIS 공연예술통합전산망', url: 'https://www.kopis.or.kr', icon: FaMusic, desc: '전국 공연 정보 및 통계 통합 제공' },
                                            { name: '문화포털', url: 'https://www.culture.go.kr', icon: FaLandmark, desc: '문화예술 공연전시 및 문화생활 정보' },
                                            { name: '예술의전당', url: 'https://www.sac.or.kr', icon: FaMusic, desc: '대한민국 대표 문화예술 중심지' },
                                            { name: '국립극장', url: 'https://www.ntok.go.kr', icon: FaLandmark, desc: '한국 공연 예술의 역사와 미래' },
                                            { name: '세종문화회관', url: 'https://www.sejongpac.or.kr', icon: FaMusic, desc: '서울의 중심, 시민을 위한 복합문화공간' },
                                            { name: '서울문화재단', url: 'https://www.sfac.or.kr', icon: FaLandmark, desc: '서울의 문화예술 진흥과 시민 문화예술 향유' },
                                        ].map((site) => (
                                            <Flex
                                                key={site.name}
                                                as="a"
                                                href={site.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                direction="column"
                                                align="center"
                                                justify="center"
                                                bg="white"
                                                p={6}
                                                borderRadius="xl"
                                                borderWidth="1px"
                                                borderColor="gray.200"
                                                transition="all 0.2s"
                                                _hover={{ transform: 'translateY(-5px)', shadow: 'md', borderColor: 'orange.300' }}
                                                cursor="pointer"
                                                textAlign="center"
                                                gap={3}
                                                h="100%"
                                            >
                                                <Icon as={site.icon} w={10} h={10} color="orange.500" mb={1} />
                                                <VStack spacing={1}>
                                                    <Text fontWeight="bold" fontSize="lg" color="gray.800">
                                                        {site.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.500" px={2}>
                                                        {site.desc}
                                                    </Text>
                                                </VStack>
                                            </Flex>
                                        ))}
                                    </SimpleGrid>
                                </VStack>
                            </Box>
                        )}


                    </VStack>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Info;
