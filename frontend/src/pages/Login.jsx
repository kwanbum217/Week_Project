import { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
  createToaster
} from '@chakra-ui/react';
import { Field } from '@chakra-ui/react/field';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const toaster = createToaster({
  placement: 'top',
  duration: 3000,
});

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted'); // 디버깅 로그
    try {
      console.log('Sending login request to backend...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.accessToken); // Navbar와 키 통일
        window.dispatchEvent(new Event('auth-change')); // Navbar 상태 업데이트
        toaster.create({
          title: '로그인 성공',
          description: 'MOOA에 오신 것을 환영합니다!',
          type: 'success',
        });
        navigate('/dashboard');
      } else {
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        throw new Error(errorText || '아이디 또는 비밀번호가 올바르지 않습니다');
      }
    } catch (error) {
      console.error('Login error:', error);
      toaster.create({
        title: '로그인 실패',
        description: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        py={8}
        mb="75px"
      >
        {/* 배경 요소 */}


        <div className="relative z-10 w-full max-w-2xl px-4">
          <div className="mooa-glass-card animate-fade-in">
            <Box textAlign="center" mb={8}>
              <Link to="/main">
                <div className="mx-auto w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white transition-transform hover:scale-105">
                  <img
                    src="/img/mooa_logo_main.png"
                    alt="MOOA 로고"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span style="font-size: 40px;">👥</span>';
                    }}
                  />
                </div>
              </Link>
              <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                mb={2}
                fontFamily="'Noto Sans KR', 'Inter', sans-serif"
                letterSpacing="-0.02em"
                style={{ color: 'var(--mooa-navy)' }}
              >
                MOOA
              </Heading>
              <Text
                fontSize="lg"
                style={{ color: 'var(--mooa-text-secondary)' }}
              >
                무아 - 함께하는 즐거움
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <Field.Root required width="100%">
                  <label className="mooa-label">아이디</label>
                  <input
                    name="username"
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                    className="mooa-input"
                  />
                </Field.Root>

                <Field.Root required width="100%">
                  <label className="mooa-label">비밀번호</label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      placeholder="비밀번호를 입력하세요"
                      className="mooa-input"
                      style={{ width: '100%', paddingRight: '80px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '5px',
                        color: '#666',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {showPassword ? '🙈 숨기기' : '👁️ 보기'}
                    </button>
                  </div>
                </Field.Root>

                <button
                  type="submit"
                  className="mooa-btn-primary w-full"
                  style={{ marginTop: '8px', position: 'relative', zIndex: 100, cursor: 'pointer' }}
                  onClick={() => console.log('Login button clicked')}
                >
                  로그인
                </button>
              </VStack>
            </form>

            <VStack spacing={3} mt={8}>
              <div className="relative w-full text-center my-4">
                <div
                  className="absolute inset-0 flex items-center"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  <div className="w-full border-t" style={{ borderColor: '#E8EEF4' }}></div>
                </div>
                <span
                  className="relative px-4 text-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    color: 'var(--mooa-text-muted)'
                  }}
                >
                  간편 로그인
                </span>
              </div>

              <a
                href="http://localhost:9999/oauth2/authorization/google"
                className="mooa-btn-primary w-full flex items-center justify-center gap-3"
                style={{
                  background: 'white',
                  border: '2px solid #E8EEF4',
                  color: 'var(--mooa-text-primary)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google로 시작하기
              </a>

              <a
                href="http://localhost:9999/oauth2/authorization/kakao"
                className="mooa-btn-primary w-full flex items-center justify-center gap-3"
                style={{
                  background: '#FEE500',
                  color: '#000000'
                }}
              >
                Kakao로 시작하기
              </a>

              <a
                href="http://localhost:9999/oauth2/authorization/naver"
                className="mooa-btn-primary w-full flex items-center justify-center gap-3"
                style={{
                  background: '#03C75A',
                  color: 'white'
                }}
              >
                Naver로 시작하기
              </a>
            </VStack>

            <Text
              textAlign="center"
              mt={8}
              fontSize="lg"
              style={{ color: 'var(--mooa-text-secondary)' }}
            >
              아직 회원이 아니신가요?{' '}
              <ChakraLink
                as={Link}
                to="/signup"
                fontWeight="bold"
                style={{ color: 'var(--mooa-orange)' }}
                _hover={{ textDecoration: 'underline' }}
              >
                회원가입
              </ChakraLink>
            </Text>
          </div>
        </div>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
