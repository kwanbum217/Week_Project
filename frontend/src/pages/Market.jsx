import { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Flex, Image, Button, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const MarketItem = ({ item, isGuest, onInteract }) => (
    <Box
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ transform: 'translateY(-2px)' }}
        role="group"
        onClick={onInteract}
    >
        <Box
            borderRadius="xl"
            overflow="hidden"
            mb={3}
            bg="gray.100"
            position="relative"
            paddingBottom="100%" // 1:1 Aspect Ratio
        >
            <Image
                src={item.image}
                alt={item.title}
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                objectFit="cover"
                transition="transform 0.3s"
                _groupHover={{ transform: 'scale(1.05)' }}
                filter={isGuest && item.id > 3 ? "blur(5px)" : "none"} // Blur some items for guests? Or just standard preview.
                fallback={<Flex h="full" align="center" justify="center" color="gray.400" bg="gray.100">이미지 없음</Flex>}
            />
        </Box>
        <Box>
            <Heading size="md" mb={1} noOfLines={1} color="gray.800" fontSize="16px" fontWeight="normal">
                {item.title}
            </Heading>
            <Text fontSize="13px" color="gray.500" mb={1} fontWeight="bold">
                {isGuest ? item.location.substring(0, 2) + "**" : item.location}
            </Text>
            <Text fontSize="14px" color="gray.600" mb={1} noOfLines={2}>
                {item.description}
            </Text>
            <Text fontSize="12px" color="blue.500" mb={2} fontWeight="bold">
                사용기간: {item.usageYears}
            </Text>
            <Flex align="center" gap={3} color="gray.400" fontSize="12px">
                <Flex align="center" gap={1}>
                    <Text as="span">❤️</Text> {item.likes}
                </Flex>
                {item.chats > 0 && (
                    <Flex align="center" gap={1}>
                        <Text as="span">💬</Text> {item.chats}
                    </Flex>
                )}
            </Flex>
        </Box>
    </Box>
);

const Market = () => {
    const [selectedCategory, setSelectedCategory] = useState('카테고리');
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const isGuest = !user || user.username === 'Guest';

    const items = [
        // 디지털기기 (4)
        {
            id: 101,
            title: '갤럭시 탭 S7',
            price: '400,000원',
            location: '반포동',
            image: '/img/market_ipad_air.png',
            likes: 25,
            chats: 5,
            category: '디지털기기',
            description: '깨끗하게 사용한 탭입니다. 펜 포함입니다.',
            usageYears: '1년 2개월'
        },
        {
            id: 102,
            title: '아이패드 에어 4세대',
            price: '550,000원',
            location: '역삼동',
            image: '/img/market_ipad_air.png',
            likes: 18,
            chats: 3,
            category: '디지털기기',
            description: '기스 하나 없는 S급 아이패드입니다.',
            usageYears: '6개월'
        },
        {
            id: 103,
            title: '무선 이어폰 버즈 프로',
            price: '90,000원',
            location: '잠실동',
            image: '/img/market_galaxy_buds.png',
            likes: 12,
            chats: 2,
            category: '디지털기기',
            description: '음질 좋은 버즈 프로 급처합니다.',
            usageYears: '1년'
        },
        {
            id: 104,
            title: '캐논 DSLR 카메라',
            price: '650,000원',
            location: '서초동',
            image: '/img/market_canon_dslr.png',
            likes: 30,
            chats: 8,
            category: '디지털기기',
            description: '입문용으로 좋은 DSLR 카메라입니다.',
            usageYears: '2년'
        },

        // 생활가전 (4)
        {
            id: 201,
            title: '안마의자 상태 최상',
            price: '350,000원',
            location: '역삼동',
            image: '/img/market_comfy_sofa.png',
            likes: 45,
            chats: 12,
            category: '생활가전',
            description: '이사 때문에 내놓습니다. 상태 최상.',
            usageYears: '2년'
        },
        {
            id: 202,
            title: '공기청정기 (필터 교체)',
            price: '120,000원',
            location: '방배동',
            image: '/img/market_air_purifier.png',
            likes: 22,
            chats: 4,
            category: '생활가전',
            description: '필터 교체한지 얼마 안 된 공기청정기.',
            usageYears: '1년 6개월'
        },
        {
            id: 203,
            title: '로봇청소기',
            price: '200,000원',
            location: '논현동',
            image: '/img/market_robot_vacuum.png',
            likes: 28,
            chats: 6,
            category: '생활가전',
            description: '맞벌이 부부에게 필수템입니다.',
            usageYears: '1년'
        },
        {
            id: 204,
            title: '미사용 온수매트',
            price: '50,000원',
            location: '천호동',
            image: '/img/market_heated_mat.png',
            likes: 15,
            chats: 2,
            category: '생활가전',
            description: '겨울철 따뜻하게 보내세요. 미사용품.',
            usageYears: '미사용'
        },

        // 가구/인테리어 (4)
        {
            id: 301,
            title: '원목 4인 식탁',
            price: '150,000원',
            location: '압구정동',
            image: '/img/market_antique_cabinet.png',
            likes: 35,
            chats: 9,
            category: '가구/인테리어',
            description: '튼튼한 원목 식탁입니다. 4인용.',
            usageYears: '3년'
        },
        {
            id: 302,
            title: '편안한 1인용 소파',
            price: '80,000원',
            location: '청담동',
            image: '/img/market_comfy_sofa.png',
            likes: 20,
            chats: 5,
            category: '가구/인테리어',
            description: '1인용 편안한 소파입니다. 휴식에 딱.',
            usageYears: '1년'
        },
        {
            id: 303,
            title: '엔틱 거실장',
            price: '250,000원',
            location: '삼성동',
            image: '/img/market_antique_cabinet.png',
            likes: 18,
            chats: 3,
            category: '가구/인테리어',
            description: '엔틱한 분위기의 거실장입니다.',
            usageYears: '5년'
        },
        {
            id: 304,
            title: '스탠드 조명',
            price: '30,000원',
            location: '도곡동',
            image: '/img/market_stand_light.png',
            likes: 12,
            chats: 1,
            category: '가구/인테리어',
            description: '침실에 두기 좋은 스탠드 조명입니다.',
            usageYears: '6개월'
        },

        // 생활/주방 (4)
        {
            id: 401,
            title: '직접 담근 김장 김치 10kg',
            price: '80,000원',
            location: '구미동',
            image: '/img/market_iron_pot.png',
            likes: 50,
            chats: 15,
            category: '생활/주방',
            description: '시골에서 직접 담근 김장 김치입니다.',
            usageYears: '오늘 담금'
        },
        {
            id: 402,
            title: '고급 찻잔 세트',
            price: '40,000원',
            location: '판교동',
            image: '/img/market_tea_set.png',
            likes: 25,
            chats: 4,
            category: '생활/주방',
            description: '선물용으로도 좋은 고급 찻잔.',
            usageYears: '미사용'
        },
        {
            id: 403,
            title: '무쇠 솥 (미사용)',
            price: '100,000원',
            location: '이태원동',
            image: '/img/market_iron_pot.png',
            likes: 33,
            chats: 7,
            category: '생활/주방',
            description: '밥맛 좋은 무쇠 솥입니다. 미사용.',
            usageYears: '미사용'
        },
        {
            id: 404,
            title: '수제 도마',
            price: '35,000원',
            location: '한남동',
            image: '/img/market_cutting_board.png',
            likes: 19,
            chats: 2,
            category: '생활/주방',
            description: '직접 만든 수제 나무 도마입니다.',
            usageYears: '새상품'
        }
    ];

    const categories = [
        '카테고리', '인기매물', '디지털기기', '생활가전', '가구/인테리어', '생활/주방',
        '여성의류', '남성의류', '신발/잡화', '뷰티/미용', '스포츠/레저',
        '취미/게임/음반', '도서', '식물', '반려동물용품', '티켓/교환권', '기타 중고물품'
    ];

    // Filter Items
    const filteredItems = items.filter(item => {
        // Search Term Filtering (Location)
        if (searchTerm && !item.location.includes(searchTerm)) {
            return false;
        }

        if (selectedCategory === '카테고리') return true;
        if (selectedCategory === '인기매물') return item.likes >= 20;
        return item.category === selectedCategory;
    });

    // Limit items for Guest - REMOVED limit as per request to show 4 per category (all 16 items)
    const displayItems = filteredItems;

    const handleInteract = () => {
        if (isGuest) {
            if (confirm('상품을 상세히 보거나 거래하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                navigate('/login');
            }
        }
    };

    return (
        <Flex direction="column" minH="100vh">
            <Box maxW="1980px" mx="auto" px="200px" py={10} flex="1" w="full">
                {/* Header / Title */}
                <Box textAlign="center" mb={12}>
                    <Heading as="h1" size="2xl" mb={4} color="gray.800" fontWeight="bold">
                        무아회원 무료나눔
                    </Heading>
                    <Text fontSize="xl" color="gray.600">
                        {isGuest ? "회원가입 후 로그인하고 가까운 친구들과 함께 무료나눔하세요!" : "당신 근처의 따뜻한 직거래 마켓"}
                    </Text>
                </Box>



                {/* Search Bar */}
                <Box maxW="600px" mx="auto" mb={10} position="relative">
                    <Input
                        placeholder="내 동네 이름(동,읍,면)으로 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        bg="white"
                        borderRadius="full"
                        borderColor="gray.300"
                        _focus={{ borderColor: 'gray.500', boxShadow: '0 0 0 1px var(--chakra-colors-gray-500)' }}
                        _hover={{ borderColor: 'gray.400' }}
                        pr="3.5rem"
                    />
                    <Button
                        position="absolute"
                        right="1"
                        top="50%"
                        transform="translateY(-50%)"
                        h="1.75rem"
                        size="sm"
                        variant="ghost"
                        borderRadius="full"
                    >
                        🔍
                    </Button>
                </Box>

                {/* Filter / Search Area */}
                <Flex justify="center" mb={10} gap={2} wrap="wrap">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            size="md"
                            borderRadius="full"
                            bg={selectedCategory === cat ? '#25D366' : 'white'}
                            color={selectedCategory === cat ? 'white' : 'gray.800'}
                            border="1px solid"
                            borderColor={selectedCategory === cat ? '#25D366' : 'gray.200'}
                            _hover={{ bg: selectedCategory === cat ? '#20bd5a' : 'gray.50' }}
                            onClick={() => setSelectedCategory(cat)}
                            fontSize="15px"
                            px={5}
                        >
                            {cat}
                        </Button>
                    ))}

                </Flex>

                {/* Items Grid */}
                <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacingX="40px" spacingY="80px">
                    {displayItems.map((item) => (
                        <MarketItem
                            key={item.id}
                            item={item}
                            isGuest={isGuest}
                            onInteract={handleInteract}
                        />
                    ))}
                </SimpleGrid>

                {/* Guest CTA */}
                {isGuest && (
                    <Box
                        mt="159px"
                        p={8}
                        style={{
                            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/img/market_guest_cta_bg.jpg')",
                            backgroundPosition: "center, center 85%",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}
                        borderRadius="2xl"
                        textAlign="center"
                        border="none"
                        color="white"
                        boxShadow="xl"
                    >
                        <Heading size="lg" mb={2} color="white">원하는 물건을 못 찾으셨나요?</Heading>
                        <Text color="whiteAlpha.900" mb={6}>더 많은 나눔이 기다리고 있습니다. 지금 가입하고 확인해보세요!</Text>
                        <Button
                            bg="#25D366"
                            color="white"
                            size="lg"
                            _hover={{ bg: '#20bd5a', transform: 'scale(1.05)' }}
                            transition="all 0.2s"
                            onClick={() => navigate('/signup')}
                            boxShadow="lg"
                        >
                            무아나눔 함께하기
                        </Button>
                    </Box>
                )}

                {!isGuest && (
                    <Flex justify="center" mt={16}>
                        <Button
                            size="lg"
                            variant="outline"
                            width="full"
                            maxW="400px"
                            borderColor="gray.300"
                            color="gray.700"
                            _hover={{ bg: 'gray.50' }}
                        >
                            더보기
                        </Button>
                    </Flex>
                )}
            </Box>
            <Footer />
        </Flex>
    );
};

export default Market;
