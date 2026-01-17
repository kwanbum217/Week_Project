import { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Flex, Image, Button, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const MarketItem = ({ item, isGuest, onInteract, navigate }) => (
    <Box
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ transform: 'translateY(-2px)' }}
        role="group"
        onClick={() => navigate(`/market/${item.id}`)}
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
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Fetch market items from backend
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/market');
                if (response.ok) {
                    const data = await response.json();
                    setItems(data);
                }
            } catch (error) {
                console.error('Failed to fetch market items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const isGuest = !user || user.username === 'Guest';



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
                            navigate={navigate}
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
