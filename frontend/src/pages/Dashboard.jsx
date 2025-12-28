import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  useDisclosure,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import VoiceCall from '../components/VoiceCall'; // VoiceCall 컴포넌트 임포트

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 제어
  const [targetUser, setTargetUser] = useState(''); // 통화 대상 사용자

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleVoiceCallClick = () => {
    // 임시로 대상 사용자 설정 (실제로는 친구 목록 등에서 선택)
    const target = prompt("통화할 상대방의 아이디를 입력하세요:");
    if (target) {
      setTargetUser(target);
      onOpen();
    }
  };

  if (!user) return null;

  return (
    <Box minHeight="100vh" py={12} px={6} position="relative">
      {/* 배경 요소 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-100/40 blur-3xl animate-float-gentle" />
        <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-blue-100/40 blur-3xl animate-float-gentle" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* 헤더 섹션 */}
        <HStack justifyContent="space-between" mb={12} className="animate-fade-in">
          <VStack align="start" spacing={1}>
            <Heading size="lg" color="var(--mooa-navy)">
              안녕하세요, <span style={{ color: 'var(--mooa-orange)' }}>{user.username}</span>님!
            </Heading>
            <Text fontSize="lg" color="var(--mooa-text-secondary)">
              오늘도 즐거운 하루 되세요 ☀️
            </Text>
          </VStack>
          <Button
            onClick={handleLogout}
            variant="ghost"
            colorScheme="gray"
            size="lg"
            className="mooa-btn-outline"
            style={{ border: '2px solid #E2E8F0', color: 'var(--mooa-text-secondary)' }}
          >
            로그아웃
          </Button>
        </HStack>

        {/* 메인 기능 그리드 */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>

          {/* 친구 찾기 카드 */}
          <div className="mooa-feature-card">
            <div className="icon orange">👥</div>
            <Heading size="md" mb={3} color="var(--mooa-navy)">친구 찾기</Heading>
            <Text color="var(--mooa-text-secondary)" mb={6}>
              취미가 같은 동네 친구를<br />찾아보세요
            </Text>
            <Button className="mooa-btn-primary w-full">
              친구 찾기
            </Button>
          </div>

          {/* 모임 참여 카드 */}
          <div className="mooa-feature-card">
            <div className="icon blue">🎉</div>
            <Heading size="md" mb={3} color="var(--mooa-navy)">모임 참여</Heading>
            <Text color="var(--mooa-text-secondary)" mb={6}>
              등산, 독서, 트로트 등<br />다양한 모임이 있어요
            </Text>
            <Button className="mooa-btn-secondary w-full">
              모임 보기
            </Button>
          </div>

          {/* 음성 통화 카드 (New) */}
          <div className="mooa-feature-card">
            <div className="icon orange">📞</div>
            <Heading size="md" mb={3} color="var(--mooa-navy)">음성 통화</Heading>
            <Text color="var(--mooa-text-secondary)" mb={6}>
              친구와 목소리로<br />안부를 전하세요
            </Text>
            <Button className="mooa-btn-primary w-full" onClick={handleVoiceCallClick}>
              통화하기
            </Button>
          </div>

          {/* 내 프로필 카드 */}
          <div className="mooa-glass-card p-6 col-span-full lg:col-span-1">
            <VStack align="start" spacing={4}>
              <Heading size="md" color="var(--mooa-navy)">내 프로필</Heading>
              <HStack>
                <Badge colorScheme="orange" p={2} borderRadius="md" fontSize="md">
                  {user.location || '지역 미설정'}
                </Badge>
                <Badge colorScheme="blue" p={2} borderRadius="md" fontSize="md">
                  {user.gender === 'male' ? '남성' : user.gender === 'female' ? '여성' : '성별 미설정'}
                </Badge>
              </HStack>
              <Text color="var(--mooa-text-secondary)">
                이메일: {user.email || '미등록'}
              </Text>
              <Button size="sm" variant="link" color="var(--mooa-orange)">
                프로필 수정하기 &gt;
              </Button>
            </VStack>
          </div>

        </Grid>
      </div>

      {/* 음성 통화 모달 */}
      <DialogRoot open={isOpen} onOpenChange={onClose} size="xl">
        <DialogContent borderRadius="24px">
          <DialogHeader>
            <DialogTitle>음성 통화</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody pb={6}>
            <VoiceCall currentUser={user} targetUser={targetUser} />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default Dashboard;
