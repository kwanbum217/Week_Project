import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
  createToaster
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const toaster = createToaster({
  placement: 'top',
  duration: 3000,
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    emailId: '',
    emailDomain: '',
    location: '',
    interests: '',
    wantToHost: '',
    wantToFindFriends: false,
    wantToMeet: false,
    wantToChat: false,
    wantToShare: false,
    agreeToReceiveTexts: false,
    agreedToTerms: false,
    agreedToPrivacy: false,
    agreedToPrivacyOptional: false
  });
  const navigate = useNavigate();

  const [idCheckResult, setIdCheckResult] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });

    if (e.target.name === 'username') {
      setIsIdChecked(false);
      setIdCheckResult('');
    }
  };

  useEffect(() => {
    // Sync email parts to full email
    setFormData(prev => ({
      ...prev,
      email: `${prev.emailId || ''}@${prev.emailDomain || ''}`
    }));
  }, [formData.emailId, formData.emailDomain]);

  const handleDomainSelect = (e) => {
    const value = e.target.value;
    if (value !== 'custom') {
      setFormData(prev => ({ ...prev, emailDomain: value }));
    } else {
      setFormData(prev => ({ ...prev, emailDomain: '' }));
    }
  };

  const handleCheckId = async () => {
    if (!formData.username) {
      toaster.create({
        title: '아이디를 입력해주세요',
        type: 'warning',
      });
      return;
    }

    try {
      const response = await fetch(`/api/auth/check-id?username=${formData.username}`);
      const text = await response.text();

      if (response.ok) {
        setIsIdChecked(true);
        setIdCheckResult(text);
        toaster.create({
          title: '사용 가능한 아이디입니다',
          type: 'success',
        });
      } else {
        setIsIdChecked(false);
        setIdCheckResult(text);
        toaster.create({
          title: text,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('ID check error:', error);
      toaster.create({
        title: '중복 확인 중 오류가 발생했습니다',
        type: 'error',
      });
    }
  };

  const handleAllAgree = (e) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      agreedToTerms: checked,
      agreedToPrivacy: checked,
      agreedToPrivacyOptional: checked,
      agreeToReceiveTexts: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isIdChecked) {
      toaster.create({
        title: '아이디 중복 확인이 필요합니다',
        type: 'warning',
      });
      return;
    }

    if (!formData.agreedToTerms || !formData.agreedToPrivacy) {
      toaster.create({
        title: '필수 약관에 동의해주세요',
        description: '이용약관 및 개인정보 수집·이용(필수)에 동의해야 가입할 수 있습니다.',
        type: 'warning',
      });
      return;
    }

    if (formData.birthDate) {
      const today = new Date();
      const birthDate = new Date(formData.birthDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 60) {
        toaster.create({
          title: '가입 제한',
          description: '만 60세 이상만 가입하실 수 있습니다.',
          type: 'error',
        });
        return;
      }
    }

    console.log('Submitting form data:', formData);
    try {
      // API call remains the same, backend simply receives the extra field
      const response = await fetch('/api/auth/register', {
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
          description: '무아에 오신 것을 환영합니다!',
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
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        py={8}
      >
        <div className="mooa-glass-card w-full max-w-2xl mx-4 animate-fade-in">
          <VStack spacing={6} align="stretch">

            {/* 로고 섹션 */}
            <Box textAlign="center" mb={4}>
              <Link to="/main">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 overflow-hidden cursor-pointer transition-transform hover:scale-105"
                  style={{
                    background: 'var(--mooa-gradient-warm)',
                    boxShadow: '0 4px 12px rgba(245, 166, 35, 0.1)'
                  }}
                >
                  <img
                    src="/img/mooa_logo_main.png"
                    alt="MOOA 로고"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span style="font-size: 32px;">👥</span>';
                    }}
                  />
                </div>
              </Link>
              <Heading
                fontFamily="'Noto Sans KR', 'Inter', sans-serif"
                mb={2}
                style={{ color: 'var(--love-navy)', fontSize: 'var(--font-size-3xl)' }}
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
                  <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <input
                      name="username"
                      onChange={handleChange}
                      placeholder="아이디를 입력하세요"
                      className="mooa-input"
                      style={{ flex: 1 }}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleCheckId}
                      className="mooa-btn-secondary"
                      style={{ height: '56px', padding: '0 24px', whiteSpace: 'nowrap', flexShrink: 0 }}
                    >
                      중복확인
                    </button>
                  </div>
                  {idCheckResult && (
                    <Text
                      mt={2}
                      fontSize="sm"
                      color={isIdChecked ? "green.500" : "red.500"}
                      fontWeight="medium"
                    >
                      {idCheckResult}
                    </Text>
                  )}
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
                  <label className="mooa-label">생년월일</label>
                  <input
                    type="date"
                    name="birthDate"
                    onChange={handleChange}
                    className="mooa-input"
                    required
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    * 만 60세 이상만 가입 가능합니다.
                  </Text>
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

                  <div className="w-full">
                    <label className="mooa-label">휴대폰 번호</label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      placeholder="휴대폰 번호를 입력하세요 (예: 010-1234-5678)"
                      className="mooa-input"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label className="mooa-label">이메일 주소</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        placeholder="이메일 아이디"
                        className="mooa-input"
                        style={{ flex: 1 }}
                        required
                      />
                      <span style={{ color: 'var(--mooa-text-muted)' }}>@</span>
                      <input
                        name="emailDomain"
                        value={formData.emailDomain}
                        onChange={handleChange}
                        placeholder="직접 입력"
                        className="mooa-input"
                        style={{ flex: 1 }}
                        required
                      />
                      <select
                        onChange={handleDomainSelect}
                        value={['naver.com', 'gmail.com', 'daum.net', 'hanmail.net'].includes(formData.emailDomain) ? formData.emailDomain : 'custom'}
                        className="mooa-input appearance-none cursor-pointer"
                        style={{ width: '140px' }}
                      >
                        <option value="custom">직접입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="daum.net">daum.net</option>
                        <option value="hanmail.net">hanmail.net</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label className="mooa-label">지역</label>
                  <input
                    name="location"
                    onChange={handleChange}
                    placeholder="거주 지역 (예: 서울시 강남구 역삼동)"
                    className="mooa-input"
                    required
                  />
                </div>

                <div className="w-full">
                  <label className="mooa-label">나의 관심사</label>
                  <div className="relative">
                    <select
                      name="interests"
                      onChange={handleChange}
                      className="mooa-input appearance-none cursor-pointer"
                      required
                    >
                      <option value="">관심사를 선택하세요</option>
                      {[
                        "기타", "노래", "댄스", "독서", "뜨개질", "먹방", "바둑",
                        "사진", "스터디", "여행", "요리", "장기", "친목", "등산"
                      ].sort().map(interest => (
                        <option key={interest} value={interest}>{interest}</option>
                      ))}
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
                  <label className="mooa-label">모임개설하기</label>
                  <div className="relative">
                    <select
                      name="wantToHost"
                      onChange={handleChange}
                      className="mooa-input appearance-none cursor-pointer"
                    >
                      <option value="">개설할 모임을 선택하세요</option>
                      {[
                        "기타", "노래", "댄스", "독서", "뜨개질", "먹방", "바둑",
                        "사진", "스터디", "여행", "요리", "장기", "친목", "등산"
                      ].sort().map(interest => (
                        <option key={interest} value={interest}>{interest}</option>
                      ))}
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

                <div className="w-full flex items-center gap-3 px-1">
                  <input
                    type="checkbox"
                    name="wantToFindFriends"
                    id="wantToFindFriends"
                    checked={formData.wantToFindFriends}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                    style={{ accentColor: 'var(--love-green)' }}
                  />
                  <label htmlFor="wantToFindFriends" className="cursor-pointer select-none text-gray-700 font-medium">
                    친구찾기에 참여하고 싶습니다
                  </label>
                </div>

                <div className="w-full flex items-center gap-3 px-1">
                  <input
                    type="checkbox"
                    name="wantToMeet"
                    id="wantToMeet"
                    checked={formData.wantToMeet}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                    style={{ accentColor: 'var(--love-green)' }}
                  />
                  <label htmlFor="wantToMeet" className="cursor-pointer select-none text-gray-700 font-medium">
                    모임하기에 참여하고 싶습니다
                  </label>
                </div>

                <div className="w-full flex items-center gap-3 px-1">
                  <input
                    type="checkbox"
                    name="wantToChat"
                    id="wantToChat"
                    checked={formData.wantToChat}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                    style={{ accentColor: 'var(--love-green)' }}
                  />
                  <label htmlFor="wantToChat" className="cursor-pointer select-none text-gray-700 font-medium">
                    대화하기에 참여하고 싶습니다
                  </label>
                </div>

                <div className="w-full flex items-center gap-3 px-1">
                  <input
                    type="checkbox"
                    name="wantToShare"
                    id="wantToShare"
                    checked={formData.wantToShare}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                    style={{ accentColor: 'var(--love-green)' }}
                  />
                  <label htmlFor="wantToShare" className="cursor-pointer select-none text-gray-700 font-medium">
                    무아나눔에 참여하고 싶습니다
                  </label>
                </div>

                {/* 약관 동의 섹션 */}
                <Box mt={6} p={5} borderWidth="1px" borderRadius="lg" bg="whiteAlpha.500" borderColor="gray.200">
                  <VStack align="stretch" spacing={4}>
                    <Box pb={3} borderBottomWidth="1px" borderColor="gray.200">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="allAgree"
                          checked={formData.agreedToTerms && formData.agreedToPrivacy && formData.agreedToPrivacyOptional && formData.agreeToReceiveTexts}
                          onChange={handleAllAgree}
                          className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="allAgree" className="cursor-pointer select-none font-bold text-lg text-gray-800">
                          모두 동의합니다.
                        </label>
                      </div>
                      <Text fontSize="xs" color="gray.500" mt={1} ml={8}>
                        이용약관, 개인정보 수집 및 이용, 프로모션 안내 메일 수신(선택)에 모두 동의합니다.
                      </Text>
                    </Box>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="agreedToTerms"
                          id="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange-500 rounded border-gray-300 cursor-pointer"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="agreedToTerms" className="cursor-pointer select-none text-gray-700 text-sm">
                          MOOA 이용 약관 (필수)
                        </label>
                      </div>
                      <ChakraLink fontSize="xs" color="gray.500" textDecoration="underline">내용보기</ChakraLink>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="agreedToPrivacy"
                          id="agreedToPrivacy"
                          checked={formData.agreedToPrivacy}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange-500 rounded border-gray-300 cursor-pointer"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="agreedToPrivacy" className="cursor-pointer select-none text-gray-700 text-sm">
                          개인정보 수집 및 이용 동의 (필수)
                        </label>
                      </div>
                      <ChakraLink fontSize="xs" color="gray.500" textDecoration="underline">내용보기</ChakraLink>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="agreedToPrivacyOptional"
                          id="agreedToPrivacyOptional"
                          checked={formData.agreedToPrivacyOptional}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange-500 rounded border-gray-300 cursor-pointer"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="agreedToPrivacyOptional" className="cursor-pointer select-none text-gray-700 text-sm">
                          개인정보 수집 및 이용 동의 (선택)
                        </label>
                      </div>
                      <ChakraLink fontSize="xs" color="gray.500" textDecoration="underline">내용보기</ChakraLink>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="agreeToReceiveTexts"
                          id="agreeToReceiveTexts"
                          checked={formData.agreeToReceiveTexts}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange-500 rounded border-gray-300 cursor-pointer"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="agreeToReceiveTexts" className="cursor-pointer select-none text-gray-700 text-sm">
                          문자 수신 서비스 이용 동의 (선택)
                        </label>
                      </div>
                      <ChakraLink fontSize="xs" color="gray.500" textDecoration="underline">내용보기</ChakraLink>
                    </div>
                  </VStack>
                </Box>

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
                style={{ color: 'var(--love-green)' }}
                _hover={{ textDecoration: 'underline' }}
              >
                로그인
              </ChakraLink>
            </Text>
          </VStack>
        </div>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignUp;
