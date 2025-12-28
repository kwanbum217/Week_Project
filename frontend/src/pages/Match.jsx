import { useState, useEffect } from 'react';
import { Box, Button, VStack, Heading, Text, SimpleGrid, createToaster } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const toaster = createToaster({
  placement: 'top',
  duration: 3000,
});

const Match = () => {
  const [matches, setMatches] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation(latitude, longitude);
          fetchMatches(latitude, longitude); // Ideally fetch after update
        },
        (error) => {
          toaster.create({
            title: 'Location error',
            description: 'Could not get your location.',
            type: 'error',
          });
        }
      );
    }
  }, []);

  const updateLocation = async (lat, lon) => {
    try {
      await fetch(`http://localhost:9999/api/matches/${user.username}/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
      });
    } catch (error) {
      console.error('Failed to update location', error);
    }
  };

  const fetchMatches = async () => {
    try {
      const response = await fetch(`http://localhost:9999/api/matches/${user.username}?radius=100`);

      // 응답 Content-Type 확인
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('서버가 JSON이 아닌 응답을 반환했습니다');
        setMatches([]); // 빈 배열로 설정
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setMatches(data);
      } else {
        console.error('매칭 조회 실패:', response.status);
        setMatches([]);
      }
    } catch (error) {
      console.error('Failed to fetch matches', error);
      setMatches([]);
    }
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Nearby Matches</Heading>
      {matches.length === 0 ? (
        <Text>No matches found nearby.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {matches.map((match) => (
            <Box key={match.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading fontSize="xl">{match.username}</Heading>
              <Text mt={4}>Gender: {match.gender}</Text>
              <Text>Location: {match.location}</Text>
              <Button colorScheme="teal" mt={4} onClick={() => navigate('/chat')}>
                Chat
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Match;
