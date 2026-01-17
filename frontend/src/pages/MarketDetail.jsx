import { useState, useEffect } from 'react';
import { Box, Heading, Text, Badge, Button, VStack, HStack, Flex, Spinner, Image } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaComment, FaShare, FaUser } from 'react-icons/fa';
import Footer from '../components/Footer';

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const response = await fetch(`/api/market/${id}`, { headers });
        if (!response.ok) {
          throw new Error('상품 정보를 불러올 수 없습니다.');
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleContact = () => {
    if (!user || user.username === 'Guest') {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    // Navigate to chat
    navigate('/chat');
  };

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex minH="100vh" direction="column" align="center" justify="center" p={8}>
        <Text color="red.500" fontSize="xl" mb={4}>{error}</Text>
        <Button onClick={() => navigate('/market')} colorScheme="green">
          나눔 목록으로 돌아가기
        </Button>
      </Flex>
    );
  }

  if (!item) {
    return (
      <Flex minH="100vh" direction="column" align="center" justify="center" p={8}>
        <Text fontSize="xl" mb={4}>상품을 찾을 수 없습니다.</Text>
        <Button onClick={() => navigate('/market')} colorScheme="green">
          나눔 목록으로 돌아가기
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" minH="100vh">
      <Box maxW="1200px" mx="auto" px={6} py={8} flex="1" w="full">
        {/* Back Button */}
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          mb={6}
          onClick={() => navigate('/market')}
          color="gray.600"
          _hover={{ color: 'green.500' }}
        >
          목록으로 돌아가기
        </Button>

        {/* Main Content */}
        <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
          {/* Image Section */}
          <Box flex="1" maxW={{ lg: '500px' }}>
            <Box
              bg="gray.100"
              borderRadius="2xl"
              overflow="hidden"
              aspectRatio={1}
              position="relative"
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="100%"
                  h="100%"
                  align="center"
                  justify="center"
                  bg="linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)"
                >
                  <Text fontSize="6xl">🎁</Text>
                </Flex>
              )}
              <Badge
                position="absolute"
                top={4}
                left={4}
                bg="green.500"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                {item.status === 'AVAILABLE' ? '나눔중' : '나눔완료'}
              </Badge>
            </Box>
          </Box>

          {/* Info Section */}
          <Box flex="1">
            <VStack align="stretch" gap={6}>
              {/* Category */}
              <Badge colorScheme="green" w="fit-content" px={3} py={1} borderRadius="full">
                {item.category || '기타'}
              </Badge>

              {/* Title */}
              <Heading size="xl" color="gray.800">{item.title}</Heading>

              {/* Price */}
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                {item.price === 0 || !item.price ? '무료 나눔' : `${item.price?.toLocaleString()}원`}
              </Text>

              {/* Seller Info */}
              <Box p={4} bg="gray.50" borderRadius="lg">
                <HStack gap={3}>
                  <Box
                    w="50px"
                    h="50px"
                    borderRadius="full"
                    bg="green.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FaUser color="#22c55e" size={24} />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.800">
                      {item.sellerName || item.seller || '판매자'}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {item.location || '지역 정보 없음'}
                    </Text>
                  </Box>
                </HStack>
              </Box>

              {/* Description */}
              <Box>
                <Heading size="md" mb={3} color="gray.800">상품 소개</Heading>
                <Text color="gray.600" lineHeight="1.8" whiteSpace="pre-wrap">
                  {item.description || '상품 소개가 없습니다.'}
                </Text>
              </Box>

              {/* Stats */}
              <HStack gap={6} color="gray.500" fontSize="sm">
                <HStack>
                  <FaHeart />
                  <Text>관심 {item.likeCount || 0}</Text>
                </HStack>
                <HStack>
                  <FaComment />
                  <Text>채팅 {item.chatCount || 0}</Text>
                </HStack>
                <Text>조회 {item.viewCount || 0}</Text>
              </HStack>

              {/* Action Buttons */}
              <Flex gap={4} mt={4}>
                <Button
                  flex="1"
                  size="lg"
                  bg="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                  color="white"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                  onClick={handleContact}
                  leftIcon={<FaComment />}
                >
                  채팅으로 문의
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="green"
                  leftIcon={<FaHeart />}
                >
                  관심
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="gray"
                  leftIcon={<FaShare />}
                >
                  공유
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </Flex>
  );
};

export default MarketDetail;
