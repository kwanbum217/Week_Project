import { useState, useEffect } from 'react';
import { Box, Heading, Text, Badge, Button, VStack, HStack, Flex, Spinner } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaUserCircle } from 'react-icons/fa';
import Footer from '../components/Footer';
import KakaoMap from '../components/map/KakaoMap';

const MeetupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meetup, setMeetup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetchMeetup = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const response = await fetch(`/api/meetups/${id}`, { headers });
        if (!response.ok) {
          throw new Error('모임 정보를 불러올 수 없습니다.');
        }
        const data = await response.json();
        setMeetup(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetup();
  }, [id]);

  const handleJoinMeetup = async () => {
    if (!user || user.username === 'Guest') {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/meetups/${id}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username })
      });

      if (response.ok) {
        alert('참가 신청이 완료되었습니다!');
        // Refresh meetup data
        const updatedMeetup = await response.json();
        setMeetup(updatedMeetup);
      } else {
        const errorText = await response.text();
        alert(errorText || '참가 신청에 실패했습니다.');
      }
    } catch (err) {
      alert('오류가 발생했습니다: ' + err.message);
    }
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
        <Button onClick={() => navigate('/meetup')} colorScheme="green">
          모임 목록으로 돌아가기
        </Button>
      </Flex>
    );
  }

  if (!meetup) {
    return (
      <Flex minH="100vh" direction="column" align="center" justify="center" p={8}>
        <Text fontSize="xl" mb={4}>모임을 찾을 수 없습니다.</Text>
        <Button onClick={() => navigate('/meetup')} colorScheme="green">
          모임 목록으로 돌아가기
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
          onClick={() => navigate('/meetup')}
          color="gray.600"
          _hover={{ color: 'green.500' }}
        >
          목록으로 돌아가기
        </Button>

        {/* Main Content */}
        <Box
          bg="rgba(255, 255, 255, 0.95)"
          borderRadius="2xl"
          boxShadow="xl"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.200"
        >
          {/* Header with Image */}
          <Box
            position="relative"
            h="300px"
            overflow="hidden"
          >
            {meetup.image ? (
              <img
                src={meetup.image}
                alt={meetup.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x300?text=Meetup'; }}
              />
            ) : (
              <Box
                w="100%"
                h="100%"
                bg="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
              />
            )}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="blackAlpha.400"
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={8}
              color="white"
            >
              <Badge colorScheme="whiteAlpha" mb={3} fontSize="sm">
                {meetup.category || '모임'}
              </Badge>
              <Heading size="xl" mb={2}>{meetup.title}</Heading>
              <HStack gap={4} flexWrap="wrap">
                <HStack>
                  <FaUserCircle />
                  <Text>주최: {meetup.hostName || meetup.host || '알 수 없음'}</Text>
                </HStack>
                <HStack>
                  <FaUsers />
                  <Text>참가자: {meetup.participantCount || 0}명</Text>
                </HStack>
              </HStack>
            </Box>
          </Box>

          {/* Body */}
          <Box p={8}>
            <VStack align="stretch" gap={6}>
              {/* Info Cards */}
              <Flex gap={4} flexWrap="wrap">
                <Box flex="1" minW="200px" p={4} bg="gray.50" borderRadius="lg">
                  <HStack color="green.600" mb={2}>
                    <FaCalendarAlt />
                    <Text fontWeight="bold">일시</Text>
                  </HStack>
                  <Text color="gray.700">
                    {meetup.date ? new Date(meetup.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    }) : '날짜 미정'}
                  </Text>
                  {meetup.time && <Text color="gray.600">{meetup.time}</Text>}
                </Box>

                <Box flex="1" minW="200px" p={4} bg="gray.50" borderRadius="lg">
                  <HStack color="green.600" mb={2}>
                    <FaMapMarkerAlt />
                    <Text fontWeight="bold">장소</Text>
                  </HStack>
                  <Text color="gray.700">{meetup.location || '장소 미정'}</Text>
                </Box>
              </Flex>

              {/* Description */}
              <Box>
                <Heading size="md" mb={3} color="gray.800">모임 소개</Heading>
                <Text color="gray.600" lineHeight="1.8" whiteSpace="pre-wrap">
                  {meetup.description || '모임 소개가 없습니다.'}
                </Text>
              </Box>

              {/* Map */}
              {meetup.latitude && meetup.longitude && (
                <Box>
                  <Heading size="md" mb={3} color="gray.800">위치</Heading>
                  <Box h="300px" borderRadius="lg" overflow="hidden">
                    <KakaoMap
                      center={{ lat: meetup.latitude, lng: meetup.longitude }}
                      markers={[{
                        position: { lat: meetup.latitude, lng: meetup.longitude },
                        content: meetup.title
                      }]}
                    />
                  </Box>
                </Box>
              )}

              {/* Action Buttons */}
              <Flex gap={4} mt={4}>
                <Button
                  flex="1"
                  size="lg"
                  bg="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                  color="white"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                  onClick={handleJoinMeetup}
                >
                  참가 신청하기
                </Button>
                <Button
                  flex="1"
                  size="lg"
                  variant="outline"
                  colorScheme="green"
                  onClick={() => navigate('/chat')}
                >
                  문의하기
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default MeetupDetail;
