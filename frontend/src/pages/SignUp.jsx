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
import { Link, useNavigate } from 'react-router-dom';

const toaster = createToaster({
  placement: 'top',
  duration: 3000,
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    gender: '',
    location: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      const response = await fetch('http://localhost:9999/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response body:', responseText);

      if (response.ok) {
        toaster.create({
          title: '회원가입 성공',
          description: '계정이 생성되었습니다.',
          type: 'success',
        });
        navigate('/login');
      } else {
        throw new Error(responseText || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toaster.create({
        title: '회원가입 실패',
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
      <div className="glass-card p-10 rounded-[30px] w-[500px] relative">
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" fontFamily="'Inter', sans-serif" color="gray.900" mb={4}>
            회원가입
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <div className="w-full">
                <label className="block text-gray-700 font-medium text-sm mb-1">아이디</label>
                <input
                  name="username"
                  onChange={handleChange}
                  placeholder="아이디를 입력하세요"
                  className="input-field"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-gray-700 font-medium text-sm mb-1">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  className="input-field"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-gray-700 font-medium text-sm mb-1">성별</label>
                <div className="relative">
                  <select
                    name="gender"
                    onChange={handleChange}
                    className="input-field appearance-none cursor-pointer"
                    required
                  >
                    <option value="">성별 선택</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="other">기타</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-gray-700 font-medium text-sm mb-1">지역</label>
                <input
                  name="location"
                  onChange={handleChange}
                  placeholder="거주 지역 (예: 서울)"
                  className="input-field"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black text-[#4ade80] font-bold rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg mt-4 cursor-pointer"
              >
                가입하기
              </button>
            </VStack>
          </form>
          <Text textAlign="center" color="gray.600" fontSize="sm">
            이미 계정이 있으신가요?{' '}
            <ChakraLink as={Link} to="/login" color="green.600" fontWeight="bold" _hover={{ color: 'green.700', textDecoration: 'underline' }}>
              로그인
            </ChakraLink>
          </Text>
        </VStack>
      </div>
    </Box>
  );
};

export default SignUp;
