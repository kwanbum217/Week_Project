import { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Button, Flex, VStack, HStack, Stack, Spinner } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaRegEnvelope, FaComments } from 'react-icons/fa6';
import Footer from '../components/Footer';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

const Match = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapLevel, setMapLevel] = useState(7); // Zoom level for ~5km radius

  // 카카오맵 SDK 로딩 (react-kakao-maps-sdk 권장 방식)
  const [kakaoLoading, kakaoError] = useKakaoLoader({
    appkey: '7c7b2503bbdfda05254a0841382d3e75',
    libraries: ['services', 'clusterer'],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // If logged in, get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
            updateUserLocation(parsedUser.username, latitude, longitude);
            fetchNearbyUsers(parsedUser.username, latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("위치 정보를 가져올 수 없습니다. 기본 위치로 설정됩니다.");
            // Default location (e.g., Seoul City Hall)
            setLocation({ lat: 37.5665, lng: 126.9780 });
          }
        );
      } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
      }
    }
  }, []);

  const updateUserLocation = async (username, lat, lng) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/matches/${username}/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ latitude: lat, longitude: lng })
      });
    } catch (error) {
      console.error("Failed to update location:", error);
    }
  };

  const fetchNearbyUsers = async (username, lat, lng) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/matches/${username}?radius=5`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Transform data to match UI structure if needed, or use directly
        // Assuming backend returns User objects. We might need to map them to display format.
        const mappedUsers = data.map(u => ({
          id: u.id,
          name: u.nickname || u.username, // Use nickname if available
          gender: u.gender || '미공개',
          age: u.birthDate ? calculateAge(u.birthDate) : '??',
          location: u.location || '위치 정보 없음',
          // Use a default image or user's image if available
          image: u.profileImage || (u.gender === '여성' ? '/img/friend_hiking.png' : '/img/friend_cycling.png'),
          matchRate: Math.floor(Math.random() * 20) + 80, // Mock match rate for now
          distance: calculateDistance(lat, lng, u.latitude, u.longitude).toFixed(1),
          interests: u.interests ? u.interests.split(',') : ['친구', '대화'],
          lat: u.latitude,
          lng: u.longitude
        }));
        setNearbyUsers(mappedUsers);
      }
    } catch (error) {
      console.error("Failed to fetch nearby users:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate) => {
    // Simple age calculation implementation
    // Assuming birthDate is YYYY-MM-DD or similar
    if (!birthDate) return '??';
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Rich Mock Data (Fallback for Guest)
  const mockMatches = [
    {
      id: 1,
      name: '행복한산행',
      gender: '여성',
      age: 65,
      location: '서울 강남구',
      image: '/img/friend_hiking.png',
      matchRate: 98,
      distance: 0.8,
      interests: ['등산', '요가', '건강'],
      lat: 37.5665, lng: 126.9780 // Mock coords
    },
    // ... (Keep other mock data if needed, or just use one for guest demo)
    {
      id: 2,
      name: '두바퀴여행',
      gender: '남성',
      age: 68,
      location: '서울 서초구',
      image: '/img/friend_cycling.png',
      matchRate: 92,
      distance: 1.5,
      interests: ['자전거', '여행', '사진'],
      lat: 37.5700, lng: 126.9800
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
      interests: ['댄스', '음악', '사교'],
      lat: 37.5600, lng: 126.9700
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
      interests: ['바둑', '독서', '토론'],
      lat: 37.5650, lng: 126.9750
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
      interests: ['요리', '원예', '봉사'],
      lat: 37.5680, lng: 126.9820
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
      interests: ['낚시', '등산', '맛집'],
      lat: 37.5620, lng: 126.9720
    }
  ];

  const categories = ['전체', '운동/건강', '문화/예술', '여행', '봉사활동'];

  // Guest Check (Treat null user as guest too)
  const isGuest = !user || user.username === 'Guest';

  // Use real data if logged in, otherwise mock data
  const matches = isGuest ? mockMatches : nearbyUsers;

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

          {/* Map Section */}
          {!isGuest && (
            <Box h="400px" w="100%" borderRadius="2xl" overflow="hidden" boxShadow="lg" border="1px solid" borderColor="gray.200" position="relative">
              {kakaoLoading || !location ? (
                <Flex justify="center" align="center" h="100%" bg="gray.50" direction="column" gap={4}>
                  <Spinner size="xl" color="#25D366" thickness="4px" />
                  <Text color="gray.500">
                    {kakaoLoading ? "카카오맵을 로딩하는 중입니다..." : "현재 위치를 불러오는 중입니다..."}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    {!location ? "브라우저의 위치 권한을 허용해주세요." : ""}
                  </Text>
                  {kakaoError && (
                    <Text fontSize="sm" color="red.500">
                      카카오맵 로딩 오류: {kakaoError.message || "API 키 또는 도메인을 확인해주세요."}
                    </Text>
                  )}
                </Flex>
              ) : (
                <Map
                  center={location}
                  style={{ width: "100%", height: "100%" }}
                  level={mapLevel}
                  onCreate={(map) => {
                    console.log("Kakao Map loaded");
                  }}
                  onError={(err) => {
                    console.error("Kakao Map Error:", err);
                    alert("지도를 불러오는데 실패했습니다. API 키를 확인해주세요.");
                  }}
                >
                  <MapMarker
                    position={location}
                    image={{
                      src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                      size: { width: 24, height: 35 },
                    }}
                    title="나의 위치"
                  />
                  {nearbyUsers.map((u) => (
                    u.lat && u.lng ? (
                      <MapMarker
                        key={u.id}
                        position={{ lat: u.lat, lng: u.lng }}
                        title={u.name}
                        onClick={() => alert(`${u.name}님은 ${u.distance}km 거리에 있습니다.`)}
                      />
                    ) : null
                  ))}
                </Map>
              )}
            </Box>
          )}

          {/* Filter Chips */}
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

          {/* Friends Grid (Rows of 3) */}
          <VStack align="stretch">
            {loading ? (
              <Flex justify="center" align="center" h="200px">
                <Spinner size="xl" color="#25D366" />
              </Flex>
            ) : matchRows.length > 0 ? (
              matchRows.map((row, rowIndex) => (
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

                          <Flex gap={2} mt={4}>
                            <Button
                              flex={1}
                              bg="#25D366"
                              color="white"
                              _hover={{ bg: "#20bd5a" }}
                              onClick={() => isGuest ? navigate('/login') : alert('친구 추가 되었습니다!')}
                              size="sm"
                              fontSize="sm"
                              borderRadius="full"
                            >
                              친구 추가
                            </Button>

                            <Button
                              flex={1}
                              bg="white"
                              color="#25D366"
                              border="1px solid #25D366"
                              _hover={{ bg: "#f0fdf4" }}
                              onClick={() => isGuest ? navigate('/login') : alert('문자가 전송되었습니다!')}
                              size="sm"
                              fontSize="sm"
                              borderRadius="full"
                            >
                              문자 보내기
                            </Button>

                            <Button
                              flex={1}
                              bg="#333333"
                              color="white"
                              _hover={{ bg: "black" }}
                              onClick={() => isGuest ? navigate('/login') : navigate('/chat')}
                              size="sm"
                              fontSize="sm"
                              borderRadius="full"
                            >
                              대화 요청
                            </Button>
                          </Flex>
                        </Box>
                      </Box>
                    );
                  })}
                </Flex>
              ))
            ) : (
              <Box textAlign="center" py={10}>
                <Text fontSize="lg" color="gray.500">주변에 친구가 없습니다. 범위를 넓혀보세요!</Text>
              </Box>
            )}
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
                  bg="#25D366"
                  color="white"
                  onClick={() => navigate('/signup')}
                  size="lg"
                  _hover={{ bg: '#20bd5a' }}
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
