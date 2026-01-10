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
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[rgba(74,222,128,0.05)] blur-3xl animate-float-gentle" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[rgba(34,197,94,0.05)] blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 w-full max-w-md px-4">
          <div className="animate-fade-in p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md bg-[var(--love-bg-glass)]">
            <Box textAlign="center" mb={8}>
              <Link to="/main">
                <div className="mx-auto w-24 h-24 mb-4 rounded-full overflow-hidden shadow-[0_0_20px_rgba(74,222,128,0.3)] border-2 border-[var(--love-green)] transition-transform hover:scale-105">
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
                color="white"
              >
                MOOA
              </Heading>
              <Text
                fontSize="lg"
                color="gray.400"
              >
                무아 - 함께하는 즐거움
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <Field.Root required width="100%">
                  <label className="block text-sm font-medium text-gray-300 mb-1">아이디</label>
                  <input
                    name="username"
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
                  />
                </Field.Root>

                <Field.Root required width="100%">
<<<<<<< Updated upstream
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
=======
                  <label className="block text-sm font-medium text-gray-300 mb-1">비밀번호</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
                  />
>>>>>>> Stashed changes
                </Field.Root>

                <button
                  type="submit"
                  className="w-full h-12 mt-2 rounded-xl bg-[var(--love-green)] text-black font-bold hover:bg-[#22c55e] transition-colors shadow-[0_0_15px_rgba(74,222,128,0.3)]"
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
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <span
                  className="relative px-4 text-sm bg-transparent text-gray-500"
                >
                  간편 로그인
                </span>
              </div>

              <a
                href="http://localhost:9999/oauth2/authorization/google"
                className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-white text-gray-800 font-medium hover:bg-gray-50 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.47 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google로 시작하기
              </a>

              <a
                href="http://localhost:9999/oauth2/authorization/kakao"
                className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-[#FEE500] text-black font-medium hover:bg-[#FDD835] transition-colors"
              >
                Kakao로 시작하기
              </a>

              <a
                href="http://localhost:9999/oauth2/authorization/naver"
                className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-[#03C75A] text-white font-medium hover:bg-[#02b351] transition-colors"
              >
                Naver로 시작하기
              </a>
            </VStack>

            <Text
              textAlign="center"
              mt={8}
              fontSize="lg"
              color="gray.400"
            >
              아직 회원이 아니신가요?{' '}
              <ChakraLink
                as={Link}
                to="/signup"
                fontWeight="bold"
                color="var(--love-green)"
                _hover={{ textDecoration: 'underline', color: '#22c55e' }}
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
