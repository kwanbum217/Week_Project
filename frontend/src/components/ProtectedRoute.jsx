import { Navigate, Outlet } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#f0e6d2"
        fontFamily="'Courier New', Courier, monospace"
      >
        <VStack spacing={4} p={8} border="2px solid #5c4033" bg="#fff9c4" boxShadow="5px 5px 0px rgba(92, 64, 51, 0.2)">
          <Heading size="lg" color="#5c4033">Access Denied</Heading>
          <Text color="#8b4513">Please log in to access this page.</Text>
          <Button
            as="a"
            href="/login"
            bg="#5c4033"
            color="#f0e6d2"
            borderRadius="0"
            _hover={{ bg: "#3e2723" }}
            fontFamily="'Courier New', Courier, monospace"
          >
            Go to Login
          </Button>
        </VStack>
      </Box>
    );
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
