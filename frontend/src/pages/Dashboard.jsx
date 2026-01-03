import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,

  Grid,
  GridItem,
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaCog, FaHistory, FaHeart, FaBan } from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isMeetingEditing, setIsMeetingEditing] = useState(false); // Deprecated, replaced by local handling per card or index
  const [editingMeetingIndex, setEditingMeetingIndex] = useState(null); // Tracks which meeting card (0, 1, 2) is being edited

  const [editForm, setEditForm] = useState({
    username: '',
    location: '',
    phone: '',
    interests: '',
    wantToFindFriends: false,
    wantToMeet: false,
    wantToChat: false,
    wantToShare: false,
    agreeToReceiveTexts: false,
    meetings: [{}, {}, {}] // Initialize with 3 empty slots
  });

  // State for Market Item Form
  const [itemForm, setItemForm] = useState({
    items: [
      { name: '', category: '', description: '', usagePeriod: '', transactionMethod: '직거래' },
      { name: '', category: '', description: '', usagePeriod: '', transactionMethod: '직거래' },
      { name: '', category: '', description: '', usagePeriod: '', transactionMethod: '직거래' }
    ]
  });

  const fileInputRef = useRef(null);
  const meetingFileInputRef = useRef(null);
  const itemFileInputRef = useRef(null);
  const [activeMeetingImageIndex, setActiveMeetingImageIndex] = useState(null);
  const [activeItemImageIndex, setActiveItemImageIndex] = useState(null);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        const updatedUser = { ...user, profileImage: newImage };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Auto-save image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemImageChange = (event) => {
    const file = event.target.files[0];
    if (file && activeItemImageIndex !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          if (img.width < 500 || img.height < 500) {
            alert("사진 해상도가 너무 낮습니다. 가로, 세로 500PX 이상의 사진을 올려주세요.");
            if (itemFileInputRef.current) itemFileInputRef.current.value = "";
          } else {
            const newItems = [...itemForm.items];
            newItems[activeItemImageIndex] = { ...newItems[activeItemImageIndex], image: e.target.result };
            setItemForm({ ...itemForm, items: newItems });
          }
          setActiveItemImageIndex(null);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMeetingImageChange = (event) => {
    const file = event.target.files[0];
    if (file && activeMeetingImageIndex !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          if (img.width < 500 || img.height < 500) {
            alert("사진 해상도가 너무 낮습니다. 가로, 세로 500PX 이상의 사진을 올려주세요.");
            if (meetingFileInputRef.current) meetingFileInputRef.current.value = "";
            setActiveMeetingImageIndex(null); // Reset active index since failed
          } else {
            const newImage = e.target.result;

            // Update User State
            const updatedMeetings = [...(user.meetings || [{}, {}, {}])];
            if (!updatedMeetings[activeMeetingImageIndex]) updatedMeetings[activeMeetingImageIndex] = {};
            updatedMeetings[activeMeetingImageIndex].image = newImage;

            const updatedUser = { ...user, meetings: updatedMeetings };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Also update editForm to reflect changes immediately if in edit mode
            const updatedEditMeetings = [...editForm.meetings];
            if (!updatedEditMeetings[activeMeetingImageIndex]) updatedEditMeetings[activeMeetingImageIndex] = {};
            updatedEditMeetings[activeMeetingImageIndex].image = newImage;
            setEditForm({ ...editForm, meetings: updatedEditMeetings });

            setActiveMeetingImageIndex(null);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Here you would typically send a request to the backend
    const updatedUser = { ...user, ...editForm };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Persist locally for demo
    setIsEditing(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Migration: Handle legacy data or existing array
      let initialMeetings = parsedUser.meetings || [{}, {}, {}];
      if (!parsedUser.meetings) {
        // Migrate legacy single fields to first slot if they exist
        initialMeetings[0] = {
          category: parsedUser.wantToHost || '',
          name: parsedUser.meetingName || '',
          description: parsedUser.meetingDescription || '',
          date: parsedUser.meetingDate || '',
          fee: parsedUser.meetingFee || '',
          capacity: parsedUser.meetingCapacity || '',
          location: parsedUser.meetingLocation || '',
          supplies: parsedUser.meetingSupplies || '',
          notes: parsedUser.meetingNotes || ''
        };
        // Ensure others are initialized
        if (!initialMeetings[1]) initialMeetings[1] = {};
        if (!initialMeetings[2]) initialMeetings[2] = {};
      }

      setEditForm({
        username: parsedUser.username || '',
        location: parsedUser.location || '',
        phone: parsedUser.phone || '',
        interests: parsedUser.interests || '',
        wantToFindFriends: parsedUser.wantToFindFriends || false,
        wantToMeet: parsedUser.wantToMeet || false,
        wantToChat: parsedUser.wantToChat || false,
        wantToShare: parsedUser.wantToShare || false,
        agreeToReceiveTexts: parsedUser.agreeToReceiveTexts || false,
        meetings: initialMeetings
      });
    } else {
      setUser({
        username: 'Guest',
        location: '서울',
        gender: 'male',
        email: 'guest@example.com'
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  // Guest View for Dashboard (My Page)
  if (user.username === 'Guest') {
    return (
      <Box minHeight="100vh" py={20} bg="gray.50" className="w-full">
        <div className="w-full max-w-[800px] mx-auto px-[50px] text-center">
          <Heading size="xl" mb={6} color="var(--mooa-navy)">나의 정보</Heading>
          <Card.Root variant="elevated" borderRadius="24px" p={10} bg="white">
            <CardBody>
              <VStack spacing={6}>
                <Text fontSize="lg" color="gray.600">
                  나의 활동 내역과 정보를 확인하시려면<br />로그인이 필요합니다.
                </Text>
                <Button
                  onClick={() => navigate('/login')}
                  colorScheme="orange"
                  bg="var(--mooa-orange)"
                  color="white"
                  size="lg"
                  width="200px"
                >
                  로그인 하기
                </Button>
                <Text fontSize="sm" color="gray.500">
                  아직 회원이 아니신가요?
                  <Button variant="link" color="var(--mooa-orange)" ml={2} onClick={() => navigate('/signup')}>
                    회원가입
                  </Button>
                </Text>
              </VStack>
            </CardBody>
          </Card.Root>
        </div>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" py={10} bg="gray.50" w="full">
      <Box maxW="1980px" mx="auto" px="200px" w="full">
        {/* Welcome Message */}
        <Box mb={8}>
          <Heading size="lg" color="gray.800" mb={2}>
            안녕하세요, <Text as="span" color="var(--mooa-orange)">{user.username}</Text>님
          </Heading>
          <Text fontSize="lg" color="gray.600">
            친구들과 즐거운 활동을 시작해 보세요
          </Text>
        </Box>

        {/* Page Title */}
        <Heading size="xl" mb={8} color="var(--mooa-navy)">나의 정보</Heading>

        <VStack spacing={8} align="stretch">
          {/* Stats Row (Moved to Top) */}
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {['내 친구', '참여 모임', '찜한 목록'].map((item, idx) => (
              <Card.Root key={idx} variant="elevated" borderRadius="xl" bg="white">
                <CardBody textAlign="center" py={6}>
                  <Heading size="xl" color="var(--mooa-navy)" mb={2}>{idx * 2 + 1}</Heading>
                  <Text fontSize="md" color="gray.500">{item}</Text>
                </CardBody>
              </Card.Root>
            ))}
          </Grid>

          {/* Menu List */}
          <Card.Root variant="elevated" borderRadius="24px" bg="white">
            <CardHeader pb={0}>
              <Heading size="md" color="gray.700">내 활동 내역</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={2} divider={<Box borderBottomWidth="1px" borderColor="gray.100" />}>
                <HStack justify="space-between" py={4} _hover={{ bg: 'gray.50' }} borderRadius="md" px={2} cursor="pointer">
                  <HStack spacing={4}>
                    <Box p={2} bg="blue.50" borderRadius="lg" color="blue.500"><FaHistory size={20} /></Box>
                    <Text fontSize="lg">최근 본 모임</Text>
                  </HStack>
                  <Text color="gray.400">{'>'}</Text>
                </HStack>
                <HStack justify="space-between" py={4} _hover={{ bg: 'gray.50' }} borderRadius="md" px={2} cursor="pointer">
                  <HStack spacing={4}>
                    <Box p={2} bg="red.50" borderRadius="lg" color="red.500"><FaHeart size={20} /></Box>
                    <Text fontSize="lg">관심있는 친구</Text>
                  </HStack>
                  <Text color="gray.400">{'>'}</Text>
                </HStack>
                <HStack justify="space-between" py={4} _hover={{ bg: 'gray.50' }} borderRadius="md" px={2} cursor="pointer" onClick={() => {
                  // Scroll to the bottom where the registration card is
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}>
                  <HStack spacing={4}>
                    <Box p={2} bg="green.50" borderRadius="lg" color="green.500"><Box fontSize="20px">🎁</Box></Box>
                    <Text fontSize="lg">무아나눔 상품등록하기</Text>
                  </HStack>
                  <Text color="gray.400">{'>'}</Text>
                </HStack>
                <HStack justify="space-between" py={4} _hover={{ bg: 'gray.50' }} borderRadius="md" px={2} cursor="pointer">
                  <HStack spacing={4}>
                    <Box p={2} bg="gray.100" borderRadius="lg" color="gray.500"><FaBan size={20} /></Box>
                    <Text fontSize="lg">친구 차단하기</Text>
                  </HStack>
                  <Text color="gray.400">{'>'}</Text>
                </HStack>
              </Stack>
            </CardBody>
          </Card.Root>

          {/* Top Section: Horizontal Profile Card */}
          <Card.Root variant="elevated" borderRadius="24px" overflow="hidden" bg="white">
            <CardBody p={8}>
              <Flex direction={{ base: 'column', lg: 'row' }} gap={10} alignItems="center">
                {/* Avatar Section */}
                {/* Avatar Section */}
                <VStack spacing={2} align="center" flexShrink={0} mb={{ base: 4, lg: 0 }}>
                  <Box position="relative" borderRadius="full" overflow="hidden">
                    <Avatar.Root w="200px" h="200px">
                      <Avatar.Fallback name={user.username} bg="var(--mooa-orange)" color="white" fontSize="4xl" />
                      <Avatar.Image src={user.profileImage || "https://bit.ly/broken-link"} />
                    </Avatar.Root>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />

                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      w="100%"
                      h="100%"
                      bg="blackAlpha.600"
                      opacity="0"
                      _hover={{ opacity: 1 }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      transition="opacity 0.2s"
                      cursor="pointer"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Button size="sm" colorScheme="whiteAlpha" variant="solid" pointerEvents="none">
                        사진 수정하기
                      </Button>
                    </Box>
                  </Box>
                  <Text fontSize="sm" color="gray.500">* 사진은 최소 200PX 이상이어야 합니다.</Text>
                </VStack>

                {/* Info Section */}
                <VStack align="stretch" flex={1} spacing={6}>
                  <VStack align="start" spacing={1}>
                    <HStack spacing={3} align="center">
                      {isEditing ? (
                        <HStack>
                          <Text fontSize="md" color="gray.600" minW="max-content">프로필명</Text>
                          <input
                            className="border rounded px-2 py-1 text-left font-bold text-2xl"
                            value={editForm.username}
                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                          />
                        </HStack>
                      ) : (
                        <HStack align="center">
                          <Text fontSize="md" color="gray.500">프로필명</Text>
                          <Heading size="2xl" color="gray.700">{user.username}</Heading>
                        </HStack>
                      )}
                      <Badge colorScheme="blue" px={3} py={1} borderRadius="full" fontSize="md">
                        {user.username === 'Guest' ? '손님' : '일반 회원'}
                      </Badge>
                    </HStack>
                    <Text fontSize="lg" color="gray.500">{user.email}</Text>
                  </VStack>

                  <Box h="1px" bg="gray.100" w="full" />

                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                    <HStack>
                      <Text color="gray.600" minW="80px">거주지</Text>
                      {isEditing ? (
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        />
                      ) : (
                        <Text fontWeight="bold" fontSize="lg">{user.location || '-'}</Text>
                      )}
                    </HStack>
                    <HStack>
                      <Text color="gray.600" minW="80px">성별</Text>
                      <Text fontWeight="bold" fontSize="lg">{user.gender === 'male' ? '남성' : '여성'}</Text>
                    </HStack>
                    <HStack>
                      <Text color="gray.600" minW="80px">휴대번호</Text>
                      {isEditing ? (
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="010-0000-0000"
                        />
                      ) : (
                        <Text fontWeight="bold" fontSize="lg">{user.phone || '-'}</Text>
                      )}
                    </HStack>
                  </Grid>

                  <Box h="1px" bg="gray.100" w="full" my={2} />

                  <HStack>
                    <Text color="gray.600" minW="80px">나의 관심사</Text>
                    {isEditing ? (
                      <div className="relative w-full">
                        <select
                          className="border rounded px-2 py-1 w-full appearance-none cursor-pointer"
                          value={editForm.interests}
                          onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })}
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
                          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
                          style={{ color: 'var(--mooa-text-muted)' }}
                        >
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <Text fontWeight="bold" fontSize="lg">{user.interests || '-'}</Text>
                    )}
                  </HStack>

                  <Box h="1px" bg="gray.100" w="full" my={2} />

                  <HStack align="start">
                    <Text color="gray.600" minW="80px" pt={isEditing ? 2 : 1}>활동 설정</Text>
                    {isEditing ? (
                      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={3} w="full">
                        <HStack>
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                            checked={editForm.wantToFindFriends}
                            onChange={(e) => setEditForm({ ...editForm, wantToFindFriends: e.target.checked })}
                          />
                          <Text fontSize="sm">친구찾기 참여</Text>
                        </HStack>
                        <HStack>
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                            checked={editForm.wantToMeet}
                            onChange={(e) => setEditForm({ ...editForm, wantToMeet: e.target.checked })}
                          />
                          <Text fontSize="sm">모임하기 참여</Text>
                        </HStack>
                        <HStack>
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                            checked={editForm.wantToChat}
                            onChange={(e) => setEditForm({ ...editForm, wantToChat: e.target.checked })}
                          />
                          <Text fontSize="sm">대화하기 참여</Text>
                        </HStack>
                        <HStack>
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                            checked={editForm.wantToShare}
                            onChange={(e) => setEditForm({ ...editForm, wantToShare: e.target.checked })}
                          />
                          <Text fontSize="sm">무아나눔 참여</Text>
                        </HStack>
                      </Grid>
                    ) : (
                      <Flex gap={2} wrap="wrap">
                        {user.wantToFindFriends && <Badge colorScheme="green">친구찾기</Badge>}
                        {user.wantToMeet && <Badge colorScheme="purple">모임하기</Badge>}
                        {user.wantToChat && <Badge colorScheme="blue">대화하기</Badge>}
                        {user.wantToShare && <Badge colorScheme="orange">무아나눔</Badge>}
                        {!user.wantToFindFriends && !user.wantToMeet && !user.wantToChat && !user.wantToShare && <Text color="gray.400">-</Text>}
                      </Flex>
                    )}
                  </HStack>

                  <Box h="1px" bg="gray.100" w="full" my={2} />

                  <HStack align="start">
                    <Text color="gray.600" minW="80px" pt={isEditing ? 2 : 1}>문자 수신</Text>
                    {isEditing ? (
                      <HStack w="full" pt={2}>
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
                          checked={editForm.agreeToReceiveTexts}
                          onChange={(e) => setEditForm({ ...editForm, agreeToReceiveTexts: e.target.checked })}
                        />
                        <Text fontSize="sm">문자 수신 동의</Text>
                      </HStack>
                    ) : (
                      <Flex>
                        {user.agreeToReceiveTexts ? (
                          <Badge colorScheme="green">동의함</Badge>
                        ) : (
                          <Badge colorScheme="gray">미동의</Badge>
                        )}
                      </Flex>
                    )}
                  </HStack>


                  <HStack justify="flex-end" pt={4} spacing={3}>
                    {isEditing ? (
                      <>
                        <Button colorScheme="gray" size="lg" variant="outline" borderRadius="xl" px={8} onClick={() => setIsEditing(false)}>
                          취소
                        </Button>
                        <Button colorScheme="orange" size="lg" borderRadius="xl" px={8} onClick={handleSaveProfile}>
                          저장
                        </Button>
                      </>
                    ) : (
                      <Button leftIcon={<FaUserEdit />} size="lg" colorScheme="orange" variant="outline" borderRadius="xl" px={8} onClick={() => setIsEditing(true)}>
                        프로필 수정
                      </Button>
                    )}
                    {!isEditing && user.username !== 'Guest' && (
                      <Button onClick={handleLogout} size="lg" variant="ghost" color="red.500" _hover={{ bg: 'red.50' }}>
                        로그아웃
                      </Button>
                    )}
                  </HStack>
                </VStack>
              </Flex>
            </CardBody>
          </Card.Root>

          {/* Create Meeting Cards (3 Slots) */}
          {[0, 1, 2].map((index) => {
            const meetingData = user?.meetings?.[index] || {}; // View data
            const isThisMeetingEditing = editingMeetingIndex === index;
            const currentEditData = editForm.meetings[index] || {}; // Edit data

            return (
              <Card.Root key={index} variant="elevated" borderRadius="24px" overflow="hidden" bg="white" mb={6}>
                <CardBody p={8}>
                  {/* Hidden Meeting File Input - Rendered once typically, or here */}
                  <input
                    type="file"
                    ref={meetingFileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleMeetingImageChange}
                  />

                  <Flex direction={{ base: 'column', lg: 'row' }} gap={10} alignItems="center">
                    <VStack spacing={2} align="center" flexShrink={0}>
                      <Box w="200px" h="200px" borderRadius="2xl" overflow="hidden" position="relative">
                        <img
                          src={meetingData.image || "/img/meeting_creation_icon.png"}
                          alt="Create Meeting"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          w="100%"
                          h="100%"
                          bg="blackAlpha.600"
                          opacity="0"
                          _hover={{ opacity: 1 }}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          transition="opacity 0.2s"
                          cursor="pointer"
                          onClick={() => {
                            setActiveMeetingImageIndex(index);
                            meetingFileInputRef.current.click();
                          }}
                        >
                          <Button size="sm" colorScheme="whiteAlpha" variant="solid" pointerEvents="none">
                            사진 수정하기
                          </Button>
                        </Box>
                      </Box>
                      <Text fontSize="sm" color="gray.500">* 사진은 최소 500PX 이상이어야 합니다.</Text>
                    </VStack>

                    <VStack align="stretch" flex={1} spacing={6}>
                      <VStack align="start" spacing={4} w="full">
                        {/* Meeting Category */}
                        <Box w="full">
                          <HStack justify="space-between" w="full">
                            <Text fontSize="sm" color="gray.600" mb={1}>{index + 1}번째 모임 카테고리</Text>
                            {!isThisMeetingEditing && !meetingData.category && (
                              <Badge colorScheme="gray">미사용 슬롯</Badge>
                            )}
                          </HStack>
                          {isThisMeetingEditing ? (
                            <div className="relative w-full">
                              <select
                                className="border rounded px-4 py-2 w-full text-lg cursor-pointer bg-gray-50"
                                value={currentEditData.category || ''}
                                onChange={(e) => {
                                  const newMeetings = [...editForm.meetings];
                                  newMeetings[index] = { ...newMeetings[index], category: e.target.value };
                                  setEditForm({ ...editForm, meetings: newMeetings });
                                }}
                              >
                                <option value="">카테고리를 선택하세요</option>
                                {[
                                  "기타", "노래", "댄스", "독서", "뜨개질", "먹방", "바둑",
                                  "사진", "스터디", "여행", "요리", "장기", "친목", "등산"
                                ].sort().map(item => (
                                  <option key={item} value={item}>{item}</option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            meetingData.category && (
                              <Badge colorScheme="orange" fontSize="md" px={2} py={1} borderRadius="md">
                                {meetingData.category}
                              </Badge>
                            )
                          )}
                        </Box>

                        {isThisMeetingEditing ? (
                          <>
                            <Box w="full">
                              <Text fontSize="sm" color="gray.600" mb={1}>모임명</Text>
                              <input
                                className="border rounded px-4 py-2 w-full"
                                placeholder="예: 즐거운 등산 모임"
                                value={currentEditData.name || ''}
                                onChange={(e) => {
                                  const newMeetings = [...editForm.meetings];
                                  newMeetings[index] = { ...newMeetings[index], name: e.target.value };
                                  setEditForm({ ...editForm, meetings: newMeetings });
                                }}
                              />
                            </Box>
                            <Box w="full">
                              <Text fontSize="sm" color="gray.600" mb={1}>모임 세부설명</Text>
                              <textarea
                                className="border rounded px-4 py-2 w-full h-24 resize-none"
                                placeholder="모임에 대한 자세한 설명을 적어주세요."
                                value={currentEditData.description || ''}
                                onChange={(e) => {
                                  const newMeetings = [...editForm.meetings];
                                  newMeetings[index] = { ...newMeetings[index], description: e.target.value };
                                  setEditForm({ ...editForm, meetings: newMeetings });
                                }}
                              />
                            </Box>

                            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                              <Box>
                                <Text fontSize="sm" color="gray.600" mb={1}>출발지</Text>
                                <input
                                  className="border rounded px-4 py-2 w-full"
                                  placeholder="예: 강남역 1번 출구"
                                  value={currentEditData.location || ''}
                                  onChange={(e) => {
                                    const newMeetings = [...editForm.meetings];
                                    newMeetings[index] = { ...newMeetings[index], location: e.target.value };
                                    setEditForm({ ...editForm, meetings: newMeetings });
                                  }}
                                />
                              </Box>
                              <Box>
                                <Text fontSize="sm" color="gray.600" mb={1}>준비물</Text>
                                <input
                                  className="border rounded px-4 py-2 w-full"
                                  placeholder="예: 운동화, 물"
                                  value={currentEditData.supplies || ''}
                                  onChange={(e) => {
                                    const newMeetings = [...editForm.meetings];
                                    newMeetings[index] = { ...newMeetings[index], supplies: e.target.value };
                                    setEditForm({ ...editForm, meetings: newMeetings });
                                  }}
                                />
                              </Box>
                            </Grid>

                            <Box w="full">
                              <Text fontSize="sm" color="gray.600" mb={1}>특이사항</Text>
                              <input
                                className="border rounded px-4 py-2 w-full"
                                placeholder="예: 우천 시 취소"
                                value={currentEditData.notes || ''}
                                onChange={(e) => {
                                  const newMeetings = [...editForm.meetings];
                                  newMeetings[index] = { ...newMeetings[index], notes: e.target.value };
                                  setEditForm({ ...editForm, meetings: newMeetings });
                                }}
                              />
                            </Box>

                            <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
                              <Box>
                                <Text fontSize="sm" color="gray.600" mb={1}>모임 일자</Text>
                                <input
                                  type="date"
                                  className="border rounded px-2 py-2 w-full"
                                  value={currentEditData.date || ''}
                                  onChange={(e) => {
                                    const newMeetings = [...editForm.meetings];
                                    newMeetings[index] = { ...newMeetings[index], date: e.target.value };
                                    setEditForm({ ...editForm, meetings: newMeetings });
                                  }}
                                />
                              </Box>
                              <Box>
                                <Text fontSize="sm" color="gray.600" mb={1}>회비</Text>
                                <input
                                  className="border rounded px-2 py-2 w-full"
                                  placeholder="예: 10,000원"
                                  value={currentEditData.fee || ''}
                                  onChange={(e) => {
                                    const newMeetings = [...editForm.meetings];
                                    newMeetings[index] = { ...newMeetings[index], fee: e.target.value };
                                    setEditForm({ ...editForm, meetings: newMeetings });
                                  }}
                                />
                              </Box>
                              <Box>
                                <Text fontSize="sm" color="gray.600" mb={1}>참여 인원</Text>
                                <input
                                  className="border rounded px-2 py-2 w-full"
                                  placeholder="예: 5명"
                                  value={currentEditData.capacity || ''}
                                  onChange={(e) => {
                                    const newMeetings = [...editForm.meetings];
                                    newMeetings[index] = { ...newMeetings[index], capacity: e.target.value };
                                    setEditForm({ ...editForm, meetings: newMeetings });
                                  }}
                                />
                              </Box>
                            </Grid>
                          </>
                        ) : (
                          <VStack align="start" spacing={1}>
                            <Heading size="xl" color="var(--mooa-navy)">
                              {meetingData.name || (meetingData.category ? `${meetingData.category} 모임` : "모임방 만들기")}
                            </Heading>
                            <Text color="gray.600" noOfLines={2}>
                              {meetingData.description || (meetingData.category ? "모임에 대한 설명이 없습니다." : "새로운 모임을 개설해보세요.")}
                            </Text>
                            {meetingData.category && (
                              <VStack align="start" spacing={1} pt={2} color="gray.600" fontSize="sm">
                                <HStack spacing={4}>
                                  <Text>📅 {meetingData.date || "미정"}</Text>
                                  <Text>💰 {meetingData.fee || "무료"}</Text>
                                  <Text>👥 {meetingData.capacity || "제한 없음"}</Text>
                                </HStack>
                                <HStack spacing={4}>
                                  <Text>📍 출발: {meetingData.location || "미정"}</Text>
                                  <Text>🎒 준비물: {meetingData.supplies || "없음"}</Text>
                                </HStack>
                                <Text>⚠️ 특이사항: {meetingData.notes || "없음"}</Text>
                              </VStack>
                            )}
                          </VStack>
                        )}
                      </VStack>

                      <Box h="1px" bg="gray.100" w="full" />

                      <HStack justify="flex-end" spacing={3}>
                        {isThisMeetingEditing ? (
                          <>
                            <Button colorScheme="gray" size="lg" variant="outline" borderRadius="xl" px={8} onClick={() => {
                              setEditingMeetingIndex(null);
                              // Reset specific card form data handled on open logic ideally, but simplistic reset:
                              // We keep edits if canceled in this simple version, or can reset from prop. Keeping for now.
                            }}>
                              취소
                            </Button>
                            <Button colorScheme="orange" size="lg" borderRadius="xl" px={8} onClick={() => {
                              handleSaveProfile();
                              setEditingMeetingIndex(null);
                            }}>
                              저장
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              colorScheme="gray"
                              variant="outline"
                              size="lg"
                              borderRadius="xl"
                              px={8}
                              leftIcon={<FaCog />}
                              onClick={() => setEditingMeetingIndex(index)}
                            >
                              주제 변경
                            </Button>
                            <Button
                              colorScheme="orange"
                              size="lg"
                              borderRadius="xl"
                              px={8}
                              onClick={() => {
                                if (!meetingData.category) {
                                  setEditingMeetingIndex(index); // Ensure editing mode if trying to create on empty slot
                                } else {
                                  alert(`'${meetingData.name || meetingData.category}' 개설 신청이 접수되었습니다.`);
                                }
                              }}
                            >
                              모임 개설하기
                            </Button>
                          </>
                        )}
                      </HStack>
                    </VStack>
                  </Flex>
                </CardBody>
              </Card.Root>
            );
          })}

          {/* Hidden Item File Input */}
          <input
            type="file"
            ref={itemFileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleItemImageChange}
          />

          {/* Share Market Item Cards (3 Slots) */}
          {[0, 1, 2].map((index) => {
            const itemData = itemForm.items[index];

            return (
              <Card.Root key={index} variant="elevated" borderRadius="24px" overflow="hidden" bg="white" mb={6}>
                <CardBody p={8}>
                  {/* Hidden Item File Input - Shared for all 3 cards */}
                  {/* Actually we can just keep one shared input outside the loop, but since I am replacing the block that contained the input, I should ensure the input is still rendered SOMEWHERE. 
                      Wait, the input is currently INSIDE the card body in the code I am replacing (line 841).
                      I should pull the input out or just render it once outside the loop?
                      The tool says "Replace the single Share Market Item Card".
                      I will render the input ONCE before the map or just inside the first iteration?
                      Better yet, I'll put it outside the map loop in the replacement content.
                   */}
                  <Flex direction={{ base: 'column', lg: 'row' }} gap={10} alignItems="center">
                    <VStack spacing={2} align="center" flexShrink={0}>
                      <Box w="200px" h="200px" borderRadius="2xl" overflow="hidden" position="relative">
                        <img
                          src={itemData.image || "/img/market_icon.png"}
                          alt="Share Item"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          w="100%"
                          h="100%"
                          bg="blackAlpha.600"
                          opacity="0"
                          _hover={{ opacity: 1 }}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          transition="opacity 0.2s"
                          cursor="pointer"
                          onClick={() => {
                            setActiveItemImageIndex(index);
                            itemFileInputRef.current.click();
                          }}
                        >
                          <Button size="md" colorScheme="whiteAlpha" variant="solid" pointerEvents="none">
                            사진 등록하기
                          </Button>
                        </Box>
                      </Box>
                      <Text fontSize="sm" color="gray.500">* 사진은 최소 500PX 이상이어야 합니다.</Text>
                    </VStack>

                    <VStack align="stretch" flex={1} spacing={6}>
                      <VStack align="start" spacing={1}>
                        <Heading size="xl" color="var(--mooa-navy)">
                          {index + 1}번째 무아나눔 상품 올리기
                        </Heading>
                        <Text color="gray.600" fontSize="lg">
                          이웃과 나누고 싶은 물건이 있나요? 따뜻한 나눔을 시작해보세요.
                        </Text>
                      </VStack>

                      <Box w="full">
                        <Text fontSize="sm" color="gray.600" mb={1}>상품 카테고리</Text>
                        <div className="relative w-full">
                          <select
                            className="border rounded px-4 py-2 w-full text-lg cursor-pointer bg-gray-50"
                            value={itemData.category}
                            onChange={(e) => {
                              const newItems = [...itemForm.items];
                              newItems[index] = { ...newItems[index], category: e.target.value };
                              setItemForm({ ...itemForm, items: newItems });
                            }}
                          >
                            <option value="">카테고리를 선택하세요</option>
                            {[
                              "디지털기기", "생활가전", "가구/인테리어", "생활/주방",
                              "여성의류", "남성의류", "신발/잡화", "뷰티/미용", "스포츠/레저",
                              "취미/게임/음반", "도서", "식물", "반려동물용품", "티켓/교환권", "기타 중고물품"
                            ].map(item => (
                              <option key={item} value={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                      </Box>

                      <Box w="full">
                        <Text fontSize="sm" color="gray.600" mb={1}>상품명</Text>
                        <input
                          className="border rounded px-4 py-2 w-full font-bold text-lg"
                          placeholder="예: 맛있는 고구마 한 박스"
                          value={itemData.name}
                          onChange={(e) => {
                            const newItems = [...itemForm.items];
                            newItems[index] = { ...newItems[index], name: e.target.value };
                            setItemForm({ ...itemForm, items: newItems });
                          }}
                        />
                      </Box>

                      <Box w="full">
                        <Text fontSize="sm" color="gray.600" mb={1}>상품설명</Text>
                        <textarea
                          className="border rounded px-4 py-2 w-full h-24 resize-none"
                          placeholder="상품에 대한 자세한 설명을 적어주세요."
                          value={itemData.description}
                          onChange={(e) => {
                            const newItems = [...itemForm.items];
                            newItems[index] = { ...newItems[index], description: e.target.value };
                            setItemForm({ ...itemForm, items: newItems });
                          }}
                        />
                      </Box>

                      <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                        <Box>
                          <Text fontSize="sm" color="gray.600" mb={1}>사용기간</Text>
                          <input
                            className="border rounded px-4 py-2 w-full"
                            placeholder="예: 1년, 미사용"
                            value={itemData.usagePeriod}
                            onChange={(e) => {
                              const newItems = [...itemForm.items];
                              newItems[index] = { ...newItems[index], usagePeriod: e.target.value };
                              setItemForm({ ...itemForm, items: newItems });
                            }}
                          />
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.600" mb={1}>거래방법</Text>
                          <div className="relative w-full">
                            <select
                              className="border rounded px-4 py-2 w-full text-lg cursor-pointer bg-gray-50"
                              value={itemData.transactionMethod}
                              onChange={(e) => {
                                const newItems = [...itemForm.items];
                                newItems[index] = { ...newItems[index], transactionMethod: e.target.value };
                                setItemForm({ ...itemForm, items: newItems });
                              }}
                            >
                              <option value="직거래">직거래</option>
                              <option value="택배">택배</option>
                              <option value="문고리 거래">문고리 거래</option>
                            </select>
                          </div>
                        </Box>
                      </Grid>

                      <Box h="1px" bg="gray.100" w="full" />

                      <HStack justify="flex-end">
                        <Button
                          colorScheme="orange"
                          size="lg"
                          borderRadius="xl"
                          px={8}
                          onClick={() => alert(`'${itemData.name || "상품"}' 등록이 완료되었습니다. (준비중)`)}
                          leftIcon={<Box fontSize="20px">🎁</Box>}
                        >
                          상품 등록하기
                        </Button>
                      </HStack>
                    </VStack>
                  </Flex>
                </CardBody>
              </Card.Root>
            );
          })}


        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
