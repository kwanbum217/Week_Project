import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading>Welcome, {user.username}!</Heading>
        <Text>Location: {user.location}</Text>
        <Text>Gender: {user.gender}</Text>

        <Box mt={8}>
          <Heading size="md">Features</Heading>
          <Button colorScheme="blue" mt={2} onClick={() => navigate('/match')}>Find Matches</Button>
          <Button colorScheme="green" mt={2} ml={2} onClick={() => navigate('/chat')}>Chat</Button>
        </Box>

        <Button colorScheme="red" onClick={handleLogout} mt={10}>Logout</Button>
      </VStack>
    </Box>
  );
};

export default Dashboard;
