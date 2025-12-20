import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
  createToaster
} from '@chakra-ui/react';
import { Field } from '@chakra-ui/react/field';
import { Link, useNavigate } from 'react-router-dom';

const toaster = createToaster({
  placement: 'top',
  duration: 3000,
});

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9999/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        toaster.create({
          title: '로그인 성공',
          type: 'success',
        });
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toaster.create({
        title: '로그인 실패',
        description: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Login Card */}
      <div className="glass-card p-10 rounded-[30px] w-[450px] relative">

        {/* Logo Section */}
        <Box textAlign="center" mb={8}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black shadow-lg mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <Heading
            size="xl"
            color="gray.900"
            fontWeight="bold"
            mb={2}
            fontFamily="'Inter', sans-serif"
            letterSpacing="-0.02em"
          >
            Love Letter
          </Heading>
          <Text color="gray.600" fontSize="sm">
            당신의 마음을 전하세요
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <Field.Root required width="100%">
              <Field.Label color="gray.700" fontWeight="medium" fontSize="sm" mb={1}>아이디</Field.Label>
              <input
                name="username"
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                className="input-field"
              />
            </Field.Root>

            <Field.Root required width="100%">
              <Field.Label color="gray.700" fontWeight="medium" fontSize="sm" mb={1}>비밀번호</Field.Label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="input-field"
              />
            </Field.Root>

            <button
              type="submit"
              className="w-full py-4 bg-black text-[#4ade80] font-bold rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg mt-2"
            >
              로그인
            </button>
          </VStack>
        </form>

        <VStack spacing={3} mt={8}>
          <div className="relative w-full text-center border-t border-gray-300 my-2">
            <span className="bg-[#fdfbf7] px-3 text-gray-500 text-sm relative -top-3">SNS 로그인</span>
          </div>

          <Button
            as="a"
            href="http://localhost:9999/oauth2/authorization/google"
            width="full"
            size="md"
            bg="white"
            color="gray.700"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            _hover={{ bg: 'gray.50' }}
            leftIcon={
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            }
          >
            Google로 시작하기
          </Button>
          <Button
            as="a"
            href="http://localhost:9999/oauth2/authorization/kakao"
            width="full"
            size="md"
            bg="#FEE500"
            color="#000000"
            borderRadius="xl"
            _hover={{ bg: '#FDD835' }}
          >
            Kakao로 시작하기
          </Button>
          <Button
            as="a"
            href="http://localhost:9999/oauth2/authorization/naver"
            width="full"
            size="md"
            bg="#03C75A"
            color="white"
            borderRadius="xl"
            _hover={{ bg: '#02B350' }}
          >
            Naver로 시작하기
          </Button>
        </VStack>

        <Text textAlign="center" mt={8} color="gray.600" fontSize="sm">
          계정이 없으신가요?{' '}
          <ChakraLink
            as={Link}
            to="/signup"
            color="green.600"
            fontWeight="bold"
            _hover={{ color: 'green.700', textDecoration: 'underline' }}
          >
            회원가입
          </ChakraLink>
        </Text>
      </div>
    </Box>
  );
};

export default Login;
