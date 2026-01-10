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
    nickname: '',
    name: '',
    password: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    emailId: '',
    emailDomain: '',
    location: '',
    interests: [],
    wantToHost: [],
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
  const [showPassword, setShowPassword] = useState(false);

  // 생년월일 분리 입력
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  // 만 60세 이상만 가입 가능하므로 년도 제한
  const currentYear = new Date().getFullYear();
  const maxBirthYear = currentYear - 60;

  const handleChange = (e) => {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    // 휴대폰 번호 자동 하이픈 포맷팅
    if (e.target.name === 'phone') {
      value = value.replace(/[^0-9]/g, '');
      if (value.length <= 3) {
        // 그대로 유지
      } else if (value.length <= 7) {
        value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
      } else {
        value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
      }
    }

    setFormData({ ...formData, [e.target.name]: value });

    if (e.target.name === 'username') {
      setIsIdChecked(false);
      setIdCheckResult('');
    }
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => {
      const currentInterests = prev.interests || [];
      if (currentInterests.includes(interest)) {
        // 이미 선택된 경우 제거
        return { ...prev, interests: currentInterests.filter(i => i !== interest) };
      } else if (currentInterests.length < 3) {
        // 3개 미만이면 추가
        return { ...prev, interests: [...currentInterests, interest] };
      } else {
        // 3개 이상이면 추가하지 않음
        return prev;
      }
    });
  };

  const handleMeetingChange = (category) => {
    setFormData(prev => {
      const currentMeetings = prev.wantToHost || [];
      if (currentMeetings.includes(category)) {
        return { ...prev, wantToHost: currentMeetings.filter(c => c !== category) };
      } else if (currentMeetings.length < 3) {
        return { ...prev, wantToHost: [...currentMeetings, category] };
      } else {
        return prev;
      }
    });
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

    if (!formData.interests || formData.interests.length < 1) {
      toaster.create({
        title: '관심사를 선택해주세요',
        description: '나의 관심사를 최소 1개 이상 선택해야 합니다.',
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

        <div className="w-full max-w-2xl mx-4 animate-fade-in p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md bg-[var(--love-bg-glass)]">
          <VStack spacing={6} align="stretch">

            {/* 로고 섹션 */}
            <Box textAlign="center" mb={4}>
              <Link to="/main">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-[0_0_15px_rgba(74,222,128,0.2)] border border-[var(--love-green)]"
                  style={{
                    background: 'rgba(0,0,0,0.5)',
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
                color="white"
                fontSize="3xl"
              >
                MOOA 회원가입
              </Heading>
              <Text color="gray.400" fontSize="base">
                새로운 인연을 만나보세요
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-1">아이디</label>
                  <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <input
                      name="username"
                      onChange={handleChange}
                      placeholder="아이디를 입력하세요"
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
                      style={{ flex: 1 }}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleCheckId}
                      className="h-12 px-6 rounded-xl bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      중복확인
                    </button>
                  </div>
                  {idCheckResult && (
                    <Text
                      mt={2}
                      fontSize="sm"
                      color={isIdChecked ? "green.400" : "red.400"}
                      fontWeight="medium"
                    >
                      {idCheckResult}
                    </Text>
                  )}
                </div>

                <div className="w-full">
<<<<<<< Updated upstream
                  <label className="mooa-label">프로필명</label>
=======
                  <label className="block text-sm font-medium text-gray-300 mb-1">비밀번호</label>
>>>>>>> Stashed changes
                  <input
                    name="nickname"
                    onChange={handleChange}
<<<<<<< Updated upstream
                    placeholder="프로필명을 입력하세요"
                    className="mooa-input"
=======
                    placeholder="비밀번호를 입력하세요"
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
>>>>>>> Stashed changes
                    required
                  />
                </div>

                <div className="w-full">
<<<<<<< Updated upstream
                  <label className="mooa-label">성명</label>
=======
                  <label className="block text-sm font-medium text-gray-300 mb-1">생년월일</label>
>>>>>>> Stashed changes
                  <input
                    name="name"
                    onChange={handleChange}
<<<<<<< Updated upstream
                    placeholder="성명을 입력하세요"
                    className="mooa-input"
=======
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
>>>>>>> Stashed changes
                    required
                    style={{ colorScheme: 'dark' }}
                  />
                </div>

                <div className="w-full">
                  <label className="mooa-label">비밀번호</label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      placeholder="비밀번호를 입력하세요"
                      className="mooa-input"
                      style={{ width: '100%', paddingRight: '80px' }}
                      required
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
                </div>

                <div className="w-full">
                  <label className="mooa-label">생년월일</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <select
                        value={birthYear}
                        onChange={(e) => {
                          setBirthYear(e.target.value);
                          if (e.target.value && birthMonth && birthDay) {
                            setFormData(prev => ({ ...prev, birthDate: `${e.target.value}-${birthMonth}-${birthDay}` }));
                          }
                        }}
                        className="mooa-input appearance-none cursor-pointer"
                        style={{ width: '100%' }}
                        required
                      >
                        <option value="">년도</option>
                        {Array.from({ length: maxBirthYear - 1920 + 1 }, (_, i) => maxBirthYear - i).map(year => (
                          <option key={year} value={year}>{year}년</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <select
                        value={birthMonth}
                        onChange={(e) => {
                          setBirthMonth(e.target.value);
                          if (birthYear && e.target.value && birthDay) {
                            setFormData(prev => ({ ...prev, birthDate: `${birthYear}-${e.target.value}-${birthDay}` }));
                          }
                        }}
                        className="mooa-input appearance-none cursor-pointer"
                        style={{ width: '100%' }}
                        required
                      >
                        <option value="">월</option>
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(month => (
                          <option key={month} value={month}>{parseInt(month)}월</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <select
                        value={birthDay}
                        onChange={(e) => {
                          setBirthDay(e.target.value);
                          if (birthYear && birthMonth && e.target.value) {
                            setFormData(prev => ({ ...prev, birthDate: `${birthYear}-${birthMonth}-${e.target.value}` }));
                          }
                        }}
                        className="mooa-input appearance-none cursor-pointer"
                        style={{ width: '100%' }}
                        required
                      >
                        <option value="">일</option>
                        {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(day => (
                          <option key={day} value={day}>{parseInt(day)}일</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    * 만 60세 이상만 가입 가능합니다. ({maxBirthYear}년 이전 출생자)
                  </Text>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-1">성별</label>
                  <div className="relative">
                    <select
                      name="gender"
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="" style={{ color: 'black' }}>성별을 선택하세요</option>
                      <option value="male" style={{ color: 'black' }}>남성</option>
                      <option value="female" style={{ color: 'black' }}>여성</option>
                      <option value="other" style={{ color: 'black' }}>기타</option>
                    </select>
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4"
                      style={{ color: 'gray' }}
                    >
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>

                  <div className="w-full mt-5">
                    <label className="block text-sm font-medium text-gray-300 mb-1">휴대폰 번호</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="휴대폰 번호를 입력하세요 (예: 010-1234-5678)"
<<<<<<< Updated upstream
                      className="mooa-input"
                      maxLength="13"
=======
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
>>>>>>> Stashed changes
                      required
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      * 숫자만 입력하시면 하이픈(-)이 자동으로 생성됩니다.
                    </Text>
                  </div>

<<<<<<< Updated upstream
                  <div className="w-full">
                    <label className="mooa-label">이메일</label>
=======
                  <div className="w-full mt-5">
                    <label className="block text-sm font-medium text-gray-300 mb-1">이메일 주소</label>
>>>>>>> Stashed changes
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        placeholder="이메일 아이디"
                        className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
                        style={{ flex: 1 }}
                        required
                      />
                      <span style={{ color: 'gray' }}>@</span>
                      <input
                        name="emailDomain"
                        value={formData.emailDomain}
                        onChange={handleChange}
                        placeholder="직접 입력"
                        className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
                        style={{ flex: 1 }}
                        required
                      />
                      <select
                        onChange={handleDomainSelect}
                        value={['naver.com', 'gmail.com', 'daum.net', 'hanmail.net'].includes(formData.emailDomain) ? formData.emailDomain : 'custom'}
                        className="h-12 px-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all appearance-none cursor-pointer"
                        style={{ width: '140px' }}
                      >
                        <option value="custom" style={{ color: 'black' }}>직접입력</option>
                        <option value="naver.com" style={{ color: 'black' }}>naver.com</option>
                        <option value="gmail.com" style={{ color: 'black' }}>gmail.com</option>
                        <option value="daum.net" style={{ color: 'black' }}>daum.net</option>
                        <option value="hanmail.net" style={{ color: 'black' }}>hanmail.net</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full">
<<<<<<< Updated upstream
                  <label className="mooa-label">주소</label>
                  <input
                    name="location"
                    onChange={handleChange}
                    placeholder="거주 주소 (예: 서울시 강남구 역삼동)"
                    className="mooa-input"
=======
                  <label className="block text-sm font-medium text-gray-300 mb-1">지역</label>
                  <input
                    name="location"
                    onChange={handleChange}
                    placeholder="거주 지역 (예: 서울시 강남구 역삼동)"
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all"
>>>>>>> Stashed changes
                    required
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    * 정확한 매칭을 위해 '동' 또는 '리'까지 상세히 입력해 주세요.
                  </Text>
                </div>

                <div className="w-full">
<<<<<<< Updated upstream
                  <label className="mooa-label">나의 관심사 (필수, 최소 1개 ~ 최대 3개)</label>
                  <Text fontSize="xs" color="gray.500" mb={2}>
                    * 최소 1개 이상, 최대 3개까지 선택 가능합니다. (현재 {(formData.interests || []).length}/3개 선택)
                  </Text>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {[
                      "기타", "노래", "댄스", "독서", "뜨개질", "먹방", "바둑",
                      "사진", "스터디", "여행", "요리", "장기", "친목", "등산"
                    ].sort().map(interest => {
                      const isSelected = (formData.interests || []).includes(interest);
                      const isDisabled = !isSelected && (formData.interests || []).length >= 3;
                      return (
                        <div
                          key={interest}
                          onClick={() => !isDisabled && handleInterestChange(interest)}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid var(--mooa-orange)' : '1px solid #e2e8f0',
                            background: isSelected ? 'rgba(255, 126, 54, 0.1)' : isDisabled ? '#f7fafc' : 'white',
                            color: isSelected ? 'var(--mooa-orange)' : isDisabled ? '#a0aec0' : '#4a5568',
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            fontWeight: isSelected ? 'bold' : 'normal',
                            textAlign: 'center',
                            transition: 'all 0.2s',
                            opacity: isDisabled ? 0.6 : 1
                          }}
                        >
                          {isSelected && '✓ '}{interest}
                        </div>
                      );
                    })}
=======
                  <label className="block text-sm font-medium text-gray-300 mb-1">나의 관심사</label>
                  <div className="relative">
                    <select
                      name="interests"
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="" style={{ color: 'black' }}>관심사를 선택하세요</option>
                      {[
                        "기타", "노래", "댄스", "독서", "뜨개질", "먹방", "바둑",
                        "사진", "스터디", "여행", "요리", "장기", "친목", "등산"
                      ].sort().map(interest => (
                        <option key={interest} value={interest} style={{ color: 'black' }}>{interest}</option>
                      ))}
                    </select>
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4"
                      style={{ color: 'gray' }}
                    >
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
>>>>>>> Stashed changes
                  </div>
                </div>

                <div className="w-full">
<<<<<<< Updated upstream
                  <label className="mooa-label">모임개설하기 (선택, 최대 3개)</label>
                  <Text fontSize="xs" color="gray.500" mb={2}>
                    * 선택사항입니다. 최대 3개까지 선택 가능합니다. (현재 {(formData.wantToHost || []).length}/3개 선택)
                  </Text>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {[
                      "기타", "노래", "댄스", "독서", "뜨개질", "먹방", "바둑",
                      "사진", "스터디", "여행", "요리", "장기", "친목", "등산"
                    ].sort().map(category => {
                      const isSelected = (formData.wantToHost || []).includes(category);
                      const isDisabled = !isSelected && (formData.wantToHost || []).length >= 3;
                      return (
                        <div
                          key={category}
                          onClick={() => !isDisabled && handleMeetingChange(category)}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid #38A169' : '1px solid #e2e8f0',
                            background: isSelected ? 'rgba(56, 161, 105, 0.1)' : isDisabled ? '#f7fafc' : 'white',
                            color: isSelected ? '#38A169' : isDisabled ? '#a0aec0' : '#4a5568',
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            fontWeight: isSelected ? 'bold' : 'normal',
                            textAlign: 'center',
                            transition: 'all 0.2s',
                            opacity: isDisabled ? 0.6 : 1
                          }}
                        >
                          {isSelected && '✓ '}{category}
                        </div>
                      );
                    })}
=======
                  <label className="block text-sm font-medium text-gray-300 mb-1">모임개설하기</label>
                  <div className="relative">
                    <select
                      name="wantToHost"
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--love-green)] focus:ring-1 focus:ring-[var(--love-green)] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" style={{ color: 'black' }}>개설할 모임을 선택하세요</option>
                      {[
                        "기타", "노래", "댄스", "독서", "뜨개질", "먹방", "바둑",
                        "사진", "스터디", "여행", "요리", "장기", "친목", "등산"
                      ].sort().map(interest => (
                        <option key={interest} value={interest} style={{ color: 'black' }}>{interest}</option>
                      ))}
                    </select>
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4"
                      style={{ color: 'gray' }}
                    >
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
>>>>>>> Stashed changes
                  </div>
                </div>

                <div className="w-full flex items-center gap-3 px-1">
                  <input
                    type="checkbox"
                    name="wantToFindFriends"
                    id="wantToFindFriends"
                    checked={formData.wantToFindFriends}
                    onChange={handleChange}
                    className="w-5 h-5 text-green-500 rounded focus:ring-green-500 border-gray-500 cursor-pointer bg-gray-700"
                    style={{ accentColor: 'var(--love-green)' }}
                  />
                  <label htmlFor="wantToFindFriends" className="cursor-pointer select-none text-gray-300 font-medium">
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
                    className="w-5 h-5 text-green-500 rounded focus:ring-green-500 border-gray-500 cursor-pointer bg-gray-700"
                    style={{ accentColor: 'var(--love-green)' }}
                  />
                  <label htmlFor="wantToMeet" className="cursor-pointer select-none text-gray-300 font-medium">
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
                    className="w-5 h-5 text-green-500 rounded focus:ring-green-500 border-gray-500 cursor-pointer bg-gray-700"
                    style={{ accentColor: 'var(--love-green)' }}
                  />
                  <label htmlFor="wantToChat" className="cursor-pointer select-none text-gray-300 font-medium">
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
                    className="w-5 h-5 text-green-500 rounded focus:ring-green-500 border-gray-500 cursor-pointer bg-gray-700"
                    style={{ accentColor: 'var(--love-green)' }}
                  />
                  <label htmlFor="wantToShare" className="cursor-pointer select-none text-gray-300 font-medium">
                    무아나눔에 참여하고 싶습니다
                  </label>
                </div>

                {/* 약관 동의 섹션 */}
                <Box mt={6} p={5} borderWidth="1px" borderRadius="lg" bg="whiteAlpha.100" borderColor="whiteAlpha.200">
                  <VStack align="stretch" spacing={4}>
                    <Box pb={3} borderBottomWidth="1px" borderColor="whiteAlpha.200">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="allAgree"
                          checked={formData.agreedToTerms && formData.agreedToPrivacy && formData.agreedToPrivacyOptional && formData.agreeToReceiveTexts}
                          onChange={handleAllAgree}
                          className="w-5 h-5 text-green-500 rounded focus:ring-green-500 border-gray-500 cursor-pointer bg-gray-700"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="allAgree" className="cursor-pointer select-none font-bold text-lg text-white">
                          모두 동의합니다.
                        </label>
                      </div>
                      <Text fontSize="xs" color="gray.400" mt={1} ml={8}>
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
                          className="w-4 h-4 text-green-500 rounded border-gray-500 cursor-pointer bg-gray-700"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="agreedToTerms" className="cursor-pointer select-none text-gray-300 text-sm">
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
                          className="w-4 h-4 text-green-500 rounded border-gray-500 cursor-pointer bg-gray-700"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="agreedToPrivacy" className="cursor-pointer select-none text-gray-300 text-sm">
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
                          className="w-4 h-4 text-green-500 rounded border-gray-500 cursor-pointer bg-gray-700"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="agreedToPrivacyOptional" className="cursor-pointer select-none text-gray-300 text-sm">
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
                          className="w-4 h-4 text-green-500 rounded border-gray-500 cursor-pointer bg-gray-700"
                          style={{ accentColor: 'var(--love-green)' }}
                        />
                        <label htmlFor="agreeToReceiveTexts" className="cursor-pointer select-none text-gray-300 text-sm">
                          문자 수신 서비스 이용 동의 (선택)
                        </label>
                      </div>
                      <ChakraLink fontSize="xs" color="gray.500" textDecoration="underline">내용보기</ChakraLink>
                    </div>
                  </VStack>
                </Box>

                <button
                  type="submit"
                  className="w-full h-12 mt-2 rounded-xl bg-[var(--love-green)] text-black font-bold hover:bg-[#22c55e] transition-colors shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                >
                  가입하기
                </button>
              </VStack>
            </form>

            <Text
              textAlign="center"
              mt={4}
              color="gray.400"
              fontSize="base"
            >
              이미 계정이 있으신가요?{' '}
              <ChakraLink
                as={Link}
                to="/login"
                fontWeight="bold"
                color="var(--love-green)"
                _hover={{ textDecoration: 'underline', color: '#22c55e' }}
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
