import { useState } from 'react';
import {
  Box,
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
          description: 'MOOA에 오신 것을 환영합니다!',
          type: 'success',
        });
        navigate('/login');
      } else {
        throw new Error(responseText || '회원가입에 실패했습니다');
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
      py={8}
    >
      <div className="mooa-glass-card w-full max-w-md mx-4 animate-fade-in">
        <VStack spacing={6} align="stretch">

          {/* 로고 섹션 */}
          <Box textAlign="center" mb={4}>
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 overflow-hidden"
              style={{
                background: 'var(--mooa-gradient-warm)',
                boxShadow: '0 8px 24px rgba(245, 166, 35, 0.2)'
              }}
            >
              <img
                src="/img/MOOA_LOGO_NEW.jpg"
                alt="MOOA 로고"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span style="font-size: 32px;">👥</span>';
                }}
              />
            </div>
            <Heading
              fontFamily="'Noto Sans KR', 'Inter', sans-serif"
              mb={2}
              style={{ color: 'var(--mooa-navy)', fontSize: 'var(--font-size-3xl)' }}
            >
              MOOA 회원가입
            </Heading>
            <Text style={{ color: 'var(--mooa-text-secondary)', fontSize: 'var(--font-size-base)' }}>
              새로운 인연을 만나보세요
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <div className="w-full">
                <label className="mooa-label">아이디</label>
                <input
                  name="username"
                  onChange={handleChange}
                  placeholder="아이디를 입력하세요"
                  className="mooa-input"
                  required
                />
              </div>

              <div className="w-full">
                <label className="mooa-label">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  className="mooa-input"
                  required
                />
              </div>

              <div className="w-full">
                <label className="mooa-label">성별</label>
                <div className="relative">
                  <select
                    name="gender"
                    onChange={handleChange}
                    className="mooa-input appearance-none cursor-pointer"
                    required
                  >
                    <option value="">성별을 선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="other">기타</option>
                  </select>
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4"
                    style={{ color: 'var(--mooa-text-muted)' }}
                  >
                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label className="mooa-label">지역</label>
                <input
                  name="location"
                  onChange={handleChange}
                  placeholder="거주 지역 (예: 서울)"
                  className="mooa-input"
                  required
                />
              </div>

              <button
                type="submit"
                className="mooa-btn-primary w-full"
                style={{ marginTop: '8px' }}
              >
                가입하기
              </button>
            </VStack>
          </form>

          <Text
            textAlign="center"
            mt={4}
            style={{ color: 'var(--mooa-text-secondary)', fontSize: 'var(--font-size-base)' }}
          >
            이미 계정이 있으신가요?{' '}
            <ChakraLink
              as={Link}
              to="/login"
              fontWeight="bold"
              style={{ color: 'var(--mooa-orange)' }}
              _hover={{ textDecoration: 'underline' }}
            >
              로그인
            </ChakraLink>
          </Text>
        </VStack>
      </div>
    </Box>
  );
};

export default SignUp;
