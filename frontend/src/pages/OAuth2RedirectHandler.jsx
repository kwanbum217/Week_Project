import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Spinner, Text } from '@chakra-ui/react';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUrlParameter = (name) => {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const decodeJWT = (token) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
      }
    };

    const token = getUrlParameter('token');

    if (token) {
      localStorage.setItem('token', token);

      // Decode JWT to get username
      const payload = decodeJWT(token);
      if (payload && payload.sub) {
        // 'sub' is the standard JWT claim for subject (username/email)
        localStorage.setItem('user', JSON.stringify({ username: payload.sub }));
        console.log('OAuth2 login successful. User:', payload.sub);
      } else {
        // Fallback to default if decoding fails
        localStorage.setItem('user', JSON.stringify({ username: 'User' }));
        console.warn('Could not decode JWT, using default username');
      }

      // Use replace to prevent going back to the redirect page
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  return null; // Render nothing for immediate transition
};

export default OAuth2RedirectHandler;
