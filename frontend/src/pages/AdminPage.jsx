import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Alert, Table, Flex, Button, VStack, Text } from '@chakra-ui/react';
import * as XLSX from 'xlsx';
import Footer from '../components/Footer';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(true);

    const [showAdminPassword, setShowAdminPassword] = useState(false);

    // 관리자 기본정보 state
    const [isAdminEditing, setIsAdminEditing] = useState(false);
    const [adminInfo, setAdminInfo] = useState({
        name: 'admin',
        email: 'admin@mooa.com',
        password: 'admin123',
        phone: '',
        region: '서울시'
    });

    // 회원 목록 페이지네이션 및 검색 state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('all');

    // 모임 데이터 및 검색 state
    const [meetups, setMeetups] = useState([]);
    const [meetingSearchTerm, setMeetingSearchTerm] = useState('');
    const [meetingSearchType, setMeetingSearchType] = useState('all');
    const [meetingCurrentPage, setMeetingCurrentPage] = useState(1);
    const meetupsPerPage = 10;

    // 채팅 관리 탭 state
    const [activeChatTab, setActiveChatTab] = useState('monitoring');

    // 무아 정보 관리 탭 state
    const [activeInfoTab, setActiveInfoTab] = useState('welfare');

    // 무아 정보 Mock Data
    const [mockInfoPosts, setMockInfoPosts] = useState([
        { id: 101, category: 'welfare', title: '[복지] 2025년 신규 청년 지원 정책 안내', date: '2025-01-08', image: 'https://via.placeholder.com/40/blue', summary: '2025년부터 시행되는 청년 지원 정책에 대한 상세 안내입니다.' },
        { id: 102, category: 'welfare', title: '[복지] 어르신 기초연금 수급 자격 변경', date: '2025-01-07', image: 'https://via.placeholder.com/40/blue', summary: '기초연금 수급 자격이 변경되었습니다. 확인해보세요.' },
        { id: 201, category: 'local', title: '[지자체] 서울시 대중교통 무제한 카드 출시', date: '2025-01-09', image: 'https://via.placeholder.com/40/green', summary: '서울시에서 대중교통 무제한 카드를 출시했습니다.' },
        { id: 301, category: 'hospital', title: '[병원] 설 연휴 비상 진료 병원 리스트', date: '2025-01-05', image: 'https://via.placeholder.com/40/red', summary: '설 연휴 기간 동안 운영하는 비상 진료 병원 목록입니다.' },
        { id: 401, category: 'health', title: '[건강] 겨울철 혈관 관리 주의사항', date: '2025-01-06', image: 'https://via.placeholder.com/40/orange', summary: '겨울철 혈관 관리를 위한 필수 건강 상식입니다.' },
        { id: 501, category: 'book', title: '[도서] 2025 트렌드 전망 추천 도서', date: '2025-01-10', image: 'https://via.placeholder.com/40/purple', summary: '2025년 트렌드를 미리 볼 수 있는 추천 도서 5선.' },
        { id: 601, category: 'performance', title: '[공연] 예술의 전당 신년 음악회', date: '2025-01-02', image: 'https://via.placeholder.com/40/yellow', summary: '예술의 전당에서 열리는 신년 음악회 정보입니다.' },
    ]);

    // 무아 정보 수정/작성 Form State
    const [editingPost, setEditingPost] = useState(null);
    const [infoTitle, setInfoTitle] = useState('');
    const [infoSummary, setInfoSummary] = useState('');
    const [infoImage, setInfoImage] = useState(null); // mock image logic

    // Font Styling State
    const [titleFont, setTitleFont] = useState('Pretendard');
    const [titleSize, setTitleSize] = useState('16px');
    const [summaryFont, setSummaryFont] = useState('Pretendard');
    const [summarySize, setSummarySize] = useState('14px');

    const fontOptions = ['Pretendard', 'Nanum Gothic', 'Malgun Gothic', 'Dotum', 'Gulim'];
    const sizeOptions = ['12px', '14px', '16px', '18px', '20px', '24px', '28px'];

    const handleEditClick = (post) => {
        setEditingPost(post);
        setInfoTitle(post.title);
        setInfoSummary(post.summary || '');
        setTitleFont(post.titleFont || 'Pretendard');
        setTitleSize(post.titleSize || '16px');
        setSummaryFont(post.summaryFont || 'Pretendard');
        setSummarySize(post.summarySize || '14px');
        // setInfoImage(post.image); // In real app, handle image preview
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Scroll to form
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
        setInfoTitle('');
        setInfoSummary('');
        setInfoImage(null);
        setTitleFont('Pretendard');
        setTitleSize('16px');
        setSummaryFont('Pretendard');
        setSummarySize('14px');
    };

    const handleMooaSubmit = () => {
        if (!infoTitle) {
            alert('제목을 입력해주세요.');
            return;
        }

        const postData = {
            category: activeInfoTab,
            title: infoTitle,
            summary: infoSummary,
            titleFont,
            titleSize,
            summaryFont,
            summarySize,
            image: 'https://via.placeholder.com/40/gray' // mock default image
        };

        if (editingPost) {
            // 수정 로직
            setMockInfoPosts(mockInfoPosts.map(post =>
                post.id === editingPost.id ? { ...post, ...postData, id: post.id, date: post.date, image: post.image } : post
            ));
            alert('게시글이 수정되었습니다.');
        } else {
            // 등록 로직
            const newPost = {
                id: Math.max(...mockInfoPosts.map(p => p.id)) + 1,
                date: new Date().toISOString().split('T')[0],
                ...postData
            };
            setMockInfoPosts([newPost, ...mockInfoPosts]);
            alert('새 게시글이 등록되었습니다.');
        }
        handleCancelEdit(); // Reset form
    };



    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('auth-change'));
                setShowLogin(true);
                setLoading(false);
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const response = await fetch('/api/admin/users', { headers });

            if (response.status === 403 || response.status === 401) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('auth-change'));
                setShowLogin(true);
                setLoading(false);
                return;
            }
            if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.');

            const data = await response.json();
            setUsers(data);
            setShowLogin(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchMeetups = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch('/api/meetups', { headers });
            if (response.ok) {
                const data = await response.json();
                setMeetups(data);
            }
        } catch (error) {
            console.error('Error fetching meetups:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchMeetups();
    }, []);

    // 관리자 제외 및 검색 필터링
    const filteredUsers = users.filter(user => {
        if (user.role === 'ADMIN') return false;

        if (!searchTerm) return true;

        const term = searchTerm.toLowerCase();
        if (searchType === 'name') return (user.name || '').toLowerCase().includes(term);
        if (searchType === 'username') return (user.username || '').toLowerCase().includes(term);
        if (searchType === 'nickname') return (user.nickname || '').toLowerCase().includes(term);
        if (searchType === 'phone') return (user.phone || '').includes(term);
        if (searchType === 'birthDate') return (user.birthDate || '').includes(term);
        if (searchType === 'email') return (user.email || '').toLowerCase().includes(term);
        if (searchType === 'location') return (user.location || '').toLowerCase().includes(term);

        // '전체' 검색인 경우
        return (user.name || '').toLowerCase().includes(term) ||
            (user.username || '').toLowerCase().includes(term) ||
            (user.nickname || '').toLowerCase().includes(term) ||
            (user.phone || '').includes(term) ||
            (user.birthDate || '').includes(term) ||
            (user.email || '').toLowerCase().includes(term) ||
            (user.location || '').toLowerCase().includes(term);
    });

    // 모임 검색 필터링
    const filteredMeetups = meetups.filter(meetup => {
        if (!meetingSearchTerm) return true;
        const term = meetingSearchTerm.toLowerCase();

        if (meetingSearchType === 'title') return (meetup.title || '').toLowerCase().includes(term);
        if (meetingSearchType === 'location') return (meetup.location || '').toLowerCase().includes(term);
        if (meetingSearchType === 'category') return (meetup.category || '').toLowerCase().includes(term);
        if (meetingSearchType === 'creatorUsername') return (meetup.creatorUsername || '').toLowerCase().includes(term);
        if (meetingSearchType === 'creatorNickname') return (meetup.creatorNickname || '').toLowerCase().includes(term);
        if (meetingSearchType === 'memberUsernames') return (meetup.memberUsernames || '').toLowerCase().includes(term);
        if (meetingSearchType === 'memberNicknames') return (meetup.memberNicknames || '').toLowerCase().includes(term);

        return (meetup.title || '').toLowerCase().includes(term) ||
            (meetup.location || '').toLowerCase().includes(term) ||
            (meetup.category || '').toLowerCase().includes(term) ||
            (meetup.creatorUsername || '').toLowerCase().includes(term) ||
            (meetup.creatorNickname || '').toLowerCase().includes(term) ||
            (meetup.memberUsernames || '').toLowerCase().includes(term) ||
            (meetup.memberNicknames || '').toLowerCase().includes(term);
    });

    const meetingTotalPages = Math.ceil(filteredMeetups.length / meetupsPerPage);
    const indexOfLastMeeting = meetingCurrentPage * meetupsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetupsPerPage;
    const currentMeetups = filteredMeetups.slice(indexOfFirstMeeting, indexOfLastMeeting);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handleExportExcel = () => {
        if (filteredUsers.length === 0) {
            alert('내보낼 데이터가 없습니다.');
            return;
        }

        // 엑셀 데이터 형식으로 변환
        const excelData = filteredUsers.map((user, index) => ({
            '번호': index + 1,
            '가입일': user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-',
            '성명': user.name || '-',
            '프로필명': user.nickname || '-',
            '아이디': user.username,
            '생년월일': user.birthDate || '-',
            '성별': user.gender === 'male' ? '남성' : user.gender === 'female' ? '여성' : user.gender || '-',
            '휴대폰번호': user.phone || '-',
            '이메일': user.email || '-',
            '주소': user.location || '-',
            '관심사': user.interests || '-',
            '모임개설': user.wantToHost || '-',
            '친구찾기': user.wantToFindFriends ? 'Y' : 'N',
            '모임하기': (user.wantToMeet === true || user.wantToMeet === 'true') ? 'Y' : 'N',
            '대화하기': (user.wantToChat === true || user.wantToChat === 'true') ? 'Y' : 'N',
            '무아나눔': (user.wantToShare === true || user.wantToShare === 'true') ? 'Y' : 'N',
            '메모': user.memo || '-'
        }));

        // 워크북 및 워크시트 생성
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '전체회원목록');

        // 열 너비 설정
        const wscols = [
            { wch: 6 },  // 번호
            { wch: 15 }, // 가입일
            { wch: 10 }, // 성명
            { wch: 15 }, // 프로필명
            { wch: 15 }, // 아이디
            { wch: 15 }, // 생년월일
            { wch: 8 },  // 성별
            { wch: 15 }, // 휴대폰번호
            { wch: 20 }, // 이메일
            { wch: 20 }, // 주소
            { wch: 30 }, // 관심사
            { wch: 30 }, // 모임개설
            { wch: 10 }, // 친구찾기
            { wch: 10 }, // 모임하기
            { wch: 10 }, // 대화하기
            { wch: 10 }, // 무아나눔
            { wch: 40 }  // 메모
        ];
        worksheet['!cols'] = wscols;

        // 파일 다운로드
        XLSX.writeFile(workbook, `MOOA_전체회원목록_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const handleExportMeetingExcel = () => {
        if (filteredMeetups.length === 0) {
            alert('내보낼 데이터가 없습니다.');
            return;
        }

        const excelData = filteredMeetups.map((meetup, index) => ({
            '번호': index + 1,
            '개설자 ID': meetup.creatorUsername || '-',
            '개설자 프로필명': meetup.creatorNickname || '-',
            '개설자 휴대번호': meetup.creatorPhone || '-',
            '가입 회원 ID': meetup.memberUsernames || '-',
            '가입 회원 프로필명': meetup.memberNicknames || '-',
            '카테고리': { 'EXERCISE_HEALTH': '운동/건강', 'CULTURE_ART': '문화/예술', 'TRAVEL': '여행', 'VOLUNTEER': '봉사' }[meetup.category] || meetup.category || '-',
            '모임명': meetup.title || '-',
            '장소': meetup.location || '-',
            '날짜': meetup.date || '-',
            '인원/정원': `${meetup.members}/${meetup.maxMembers}`,
            '참가비': meetup.cost || '-',
            '교통편': meetup.transport || '-',
            '시간': `${meetup.startTime || ''} ~ ${meetup.endTime || ''}`,
            '준비물': meetup.supplies || '-',
            '태그': meetup.tags || '-'
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '모임목록');

        const wscols = [
            { wch: 6 },  // 번호
            { wch: 15 }, // 개설자 ID
            { wch: 15 }, // 개설자 프로필명
            { wch: 15 }, // 카테고리
            { wch: 30 }, // 모임명
            { wch: 20 }, // 장소
            { wch: 15 }, // 날짜
            { wch: 10 }, // 인원/정원
            { wch: 30 }, // 가입 회원 ID
            { wch: 30 }, // 가입 회원 프로필명
            { wch: 15 }, // 참가비
            { wch: 15 }, // 교통편
            { wch: 20 }, // 시간
            { wch: 30 }, // 준비물
            { wch: 20 }  // 태그
        ];
        worksheet['!cols'] = wscols;

        XLSX.writeFile(workbook, `MOOA_모임목록_${new Date().toISOString().split('T')[0]}.xlsx`);
    };



    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.accessToken); // 토큰 저장
                localStorage.setItem('user', JSON.stringify(data.user)); // 유저 정보 저장
                window.dispatchEvent(new Event('auth-change')); // Navbar 업데이트

                // 관리자 권한 확인 (선택 사항, 서버에서 막겠지만 UX를 위해)
                if (data.user.role !== 'ADMIN') {
                    alert('관리자 계정만 접근할 수 있습니다. 현재 역할: ' + data.user.role);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.dispatchEvent(new Event('auth-change'));
                    return;
                }

                setShowLogin(false);
                fetchUsers(); // 데이터 다시 불러오기
            } else {
                const errorData = await response.text();
                alert(`로그인 실패: ${errorData || '아이디 또는 비밀번호를 확인하세요.'}`);
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    if (loading && !showLogin) return <Box p={10} display="flex" justifyContent="center"><Spinner size="xl" /></Box>;

    if (showLogin) {
        return (
            <Flex direction="column" minH="100vh">
                <Box display="flex" justifyContent="center" alignItems="center" flex="1" mt={32} pb={20}>
                    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white" width="100%">
                        <Box textAlign="center" mb={6}>
                            <Heading size="lg" mb={2}>관리자 로그인</Heading>
                            <Box color="gray.500">관리자 계정으로 로그인해주세요.</Box>
                        </Box>
                        <form onSubmit={handleLogin}>
                            <Box mb={4}>
                                <Box mb={2} fontWeight="bold">아이디</Box>
                                <input
                                    name="username"
                                    placeholder="아이디"
                                    value={loginForm.username}
                                    onChange={handleLoginChange}
                                    className="mooa-input"
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                />
                            </Box>
                            <Box mb={6}>
                                <Box mb={2} fontWeight="bold">비밀번호</Box>
                                <Box position="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="비밀번호"
                                        value={loginForm.password}
                                        onChange={handleLoginChange}
                                        className="mooa-input"
                                        style={{ width: '100%', padding: '10px', paddingRight: '45px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '5px',
                                            color: '#666',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {showPassword ? '🙈 숨기기' : '👁️ 보기'}
                                    </button>
                                </Box>
                            </Box>
                            <button
                                type="submit"
                                className="mooa-btn-primary"
                                style={{ width: '100%', padding: '12px', cursor: 'pointer', backgroundColor: 'var(--mooa-orange, #FF7E36)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}
                            >
                                로그인
                            </button>
                        </form>
                    </Box>
                </Box>
                <Footer />
            </Flex>
        );
    }

    if (error) return (
        <Box p={10} mt={20}>
            <Alert.Root status="error" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" py={10}>
                <Alert.Indicator boxSize="40px" />
                <Heading size="md" mt={4} mb={1}>접근 제한</Heading>
                <Alert.Description>{error}</Alert.Description>
            </Alert.Root>
        </Box>
    );

    return (
        <Flex direction="column" minH="100vh">
            <Box maxW="1980px" mx="auto" px="200px" py={10} mt={32} mb="75px" flex="1" w="full">
                <Heading mb={8} color="teal.600">관리자 설정</Heading>

                {/* 관리자 기본정보 섹션 */}
                <Box mb={10} p={8} shadow="lg" borderRadius="2xl" bg="white">
                    <Heading size="md" mb={6} color="gray.700">👤 관리자 기본정보</Heading>
                    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={6}>
                        <Box>
                            <Box mb={2} fontWeight="bold" color="gray.600">관리자 이름</Box>
                            <input
                                type="text"
                                value={adminInfo.name}
                                onChange={(e) => setAdminInfo({ ...adminInfo, name: e.target.value })}
                                disabled={!isAdminEditing}
                                className="mooa-input"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: isAdminEditing ? 'white' : '#f7fafc',
                                    cursor: isAdminEditing ? 'text' : 'not-allowed'
                                }}
                                placeholder="관리자 이름"
                            />
                        </Box>
                        <Box>
                            <Box mb={2} fontWeight="bold" color="gray.600">이메일</Box>
                            <input
                                type="email"
                                value={adminInfo.email}
                                onChange={(e) => setAdminInfo({ ...adminInfo, email: e.target.value })}
                                disabled={!isAdminEditing}
                                className="mooa-input"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: isAdminEditing ? 'white' : '#f7fafc',
                                    cursor: isAdminEditing ? 'text' : 'not-allowed'
                                }}
                                placeholder="관리자 이메일"
                            />
                        </Box>
                        <Box>
                            <Box mb={2} fontWeight="bold" color="gray.600">연락처</Box>
                            <input
                                type="tel"
                                value={adminInfo.phone}
                                onChange={(e) => {
                                    let val = e.target.value.replace(/[^0-9]/g, '');
                                    if (val.length <= 3) {
                                        // 그대로
                                    } else if (val.length <= 7) {
                                        val = val.replace(/(\d{3})(\d{1,4})/, '$1-$2');
                                    } else {
                                        val = val.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
                                    }
                                    setAdminInfo({ ...adminInfo, phone: val });
                                }}
                                disabled={!isAdminEditing}
                                className="mooa-input"
                                maxLength="13"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: isAdminEditing ? 'white' : '#f7fafc',
                                    cursor: isAdminEditing ? 'text' : 'not-allowed'
                                }}
                                placeholder="관리자 연락처 (예: 010-1234-5678)"
                            />
                            {isAdminEditing && (
                                <Box fontSize="xs" color="gray.500" mt={1}>
                                    * 숫자만 입력하시면 하이픈(-)이 자동으로 생성됩니다.
                                </Box>
                            )}
                        </Box>
                        <Box>
                            <Box mb={2} fontWeight="bold" color="gray.600">비밀번호</Box>
                            <Box position="relative">
                                <input
                                    type={showAdminPassword ? "text" : "password"}
                                    value={adminInfo.password}
                                    onChange={(e) => setAdminInfo({ ...adminInfo, password: e.target.value })}
                                    disabled={!isAdminEditing}
                                    className="mooa-input"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        paddingRight: '80px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: isAdminEditing ? 'white' : '#f7fafc',
                                        cursor: isAdminEditing ? 'text' : 'not-allowed'
                                    }}
                                    placeholder="관리자 비밀번호"
                                />
                                <button
                                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: '#319795',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {showAdminPassword ? '숨기기' : '보기'}
                                </button>
                            </Box>
                        </Box>
                        <Box>
                            <Box mb={2} fontWeight="bold" color="gray.600">관리 지역</Box>
                            <input
                                type="text"
                                value={adminInfo.region}
                                onChange={(e) => setAdminInfo({ ...adminInfo, region: e.target.value })}
                                disabled={!isAdminEditing}
                                className="mooa-input"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: isAdminEditing ? 'white' : '#f7fafc',
                                    cursor: isAdminEditing ? 'text' : 'not-allowed'
                                }}
                                placeholder="담당 관리 지역"
                            />
                        </Box>
                    </Box>
                    <Box mt={6} display="flex" justifyContent="flex-end" gap={3}>
                        <button
                            onClick={() => setIsAdminEditing(!isAdminEditing)}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: isAdminEditing ? '#EDF2F7' : 'white',
                                color: '#4a5568',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {isAdminEditing ? '취소' : '수정'}
                        </button>
                        <button
                            onClick={() => {
                                if (isAdminEditing) {
                                    alert('관리자 정보가 저장되었습니다.');
                                    setIsAdminEditing(false);
                                }
                            }}
                            disabled={!isAdminEditing}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                border: 'none',
                                background: isAdminEditing ? '#319795' : '#A0AEC0',
                                color: 'white',
                                cursor: isAdminEditing ? 'pointer' : 'not-allowed',
                                fontWeight: 'bold'
                            }}
                        >
                            저장
                        </button>
                    </Box>
                </Box>

                {/* 회원 조회 섹션 */}
                <Box mb={8} p={6} shadow="md" borderRadius="2xl" bg="gray.50" border="1px solid #e2e8f0">
                    <Heading size="sm" mb={4} color="gray.600">🔍 회원 조회</Heading>
                    <Flex gap={4} align="center">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="mooa-input"
                            style={{
                                width: '150px',
                                background: 'white',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}
                        >
                            <option value="all">전체 검색</option>
                            <option value="name">성명</option>
                            <option value="username">아이디</option>
                            <option value="nickname">프로필명</option>
                            <option value="birthDate">생년월일</option>
                            <option value="phone">휴대폰번호</option>
                            <option value="email">이메일</option>
                            <option value="location">주소</option>
                        </select>
                        <Box flex={1} position="relative">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요 (성명, 아이디, 프로필명, 생년월일, 휴대폰, 이메일, 주소 등)"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // 검색 시 첫 페이지로 이동
                                }}
                                className="mooa-input"
                                style={{
                                    width: '100%',
                                    paddingLeft: '40px',
                                    background: 'white',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0'
                                }}
                            />
                            <Box position="absolute" left="15px" top="50%" transform="translateY(-50%)" color="gray.400">
                                🔎
                            </Box>
                        </Box>
                        {searchTerm && (
                            <Button
                                variant="ghost"
                                onClick={() => setSearchTerm('')}
                                color="gray.500"
                            >
                                초기화
                            </Button>
                        )}
                        <Box color="gray.500" fontSize="sm" fontWeight="medium">
                            검색 결과: <b>{filteredUsers.length}</b>명
                        </Box>
                    </Flex>
                </Box>
                <Flex justify="space-between" align="center" mb={4}>
                    <Heading size="md" color="gray.700">📋 전체 회원 목록 ({filteredUsers.length}명)</Heading>
                    <Button
                        onClick={handleExportExcel}
                        colorScheme="orange"
                        variant="solid"
                        size="sm"
                        borderRadius="xl"
                        fontWeight="bold"
                        leftIcon={<span>📥</span>}
                        _hover={{ bg: "orange.600" }}
                    >
                        엑셀 다운로드
                    </Button>
                </Flex>
                <Box overflowX="auto" shadow="lg" borderRadius="2xl" bg="white">
                    <Table.Root variant="simple" size="lg">
                        <Table.Header bg="gray.100">
                            <Table.Row>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">번호</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">가입일</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">성명</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">아이디</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">프로필명</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">생년월일</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">성별</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">휴대폰번호</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">이메일</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">주소</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">관심사</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">모임개설</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">친구찾기</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">모임하기</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">대화하기</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">무아나눔</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">메모</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {currentUsers.map((user, index) => (
                                <Table.Row key={user.id} _hover={{ bg: "gray.50" }}>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">
                                        {indexOfFirstUser + index + 1}
                                    </Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                                    </Table.Cell>
                                    <Table.Cell px={4} py={4} fontWeight="bold" whiteSpace="nowrap">{user.name || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{user.username}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{user.nickname || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{user.birthDate || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{user.gender === 'male' ? '남성' : user.gender === 'female' ? '여성' : user.gender || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{user.phone || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{user.email || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{user.location || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} maxW="150px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                                        {user.interests || '-'}
                                    </Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{user.wantToHost || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} textAlign="center">{user.wantToFindFriends ? '✅' : '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} textAlign="center">{user.wantToMeet === true || user.wantToMeet === 'true' ? '✅' : '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} textAlign="center">{user.wantToChat === true || user.wantToChat === 'true' ? '✅' : '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} textAlign="center">{user.wantToShare === true || user.wantToShare === 'true' ? '✅' : '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} minW="200px" fontSize="sm" color="gray.600">
                                        {user.memo || '-'}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                    <Box mt={6} display="flex" justifyContent="center" alignItems="center" gap={2}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: currentPage === 1 ? '#f7fafc' : 'white',
                                color: currentPage === 1 ? '#a0aec0' : '#4a5568',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ◀ 이전
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: currentPage === page ? '2px solid #319795' : '1px solid #e2e8f0',
                                    background: currentPage === page ? '#319795' : 'white',
                                    color: currentPage === page ? 'white' : '#4a5568',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    minWidth: '40px'
                                }}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: currentPage === totalPages ? '#f7fafc' : 'white',
                                color: currentPage === totalPages ? '#a0aec0' : '#4a5568',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            다음 ▶
                        </button>

                        <Box ml={4} color="gray.600" fontSize="sm">
                            {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} / 전체 {filteredUsers.length}명
                        </Box>
                    </Box>
                )}

                {/* 모임 관리 섹션 구분선 */}
                <Box my={12} borderTop="2px dashed #e2e8f0" />

                {/* 모임 조회 섹션 */}
                <Box mb={8} p={6} shadow="md" borderRadius="2xl" bg="gray.50" border="1px solid #e2e8f0">
                    <Heading size="sm" mb={4} color="gray.600">📅 모임 조회</Heading>
                    <Flex gap={4} align="center">
                        <select
                            value={meetingSearchType}
                            onChange={(e) => setMeetingSearchType(e.target.value)}
                            className="mooa-input"
                            style={{
                                width: '150px',
                                background: 'white',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}
                        >
                            <option value="all">전체 검색</option>
                            <option value="creatorUsername">개설자 ID</option>
                            <option value="creatorNickname">개설자 프로필명</option>
                            <option value="memberUsernames">가입 회원 ID</option>
                            <option value="memberNicknames">가입 회원 프로필명</option>
                            <option value="title">모임명</option>
                            <option value="location">장소</option>
                            <option value="category">카테고리</option>
                        </select>
                        <Box flex={1} position="relative">
                            <input
                                type="text"
                                placeholder="모임 정보를 입력하세요 (제목, 장소, 카테고리 등)"
                                value={meetingSearchTerm}
                                onChange={(e) => {
                                    setMeetingSearchTerm(e.target.value);
                                    setMeetingCurrentPage(1);
                                }}
                                className="mooa-input"
                                style={{
                                    width: '100%',
                                    paddingLeft: '40px',
                                    background: 'white',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0'
                                }}
                            />
                            <Box position="absolute" left="15px" top="50%" transform="translateY(-50%)" color="gray.400">
                                🔎
                            </Box>
                        </Box>
                        {meetingSearchTerm && (
                            <Button
                                variant="ghost"
                                onClick={() => setMeetingSearchTerm('')}
                                color="gray.500"
                            >
                                초기화
                            </Button>
                        )}
                        <Box color="gray.500" fontSize="sm" fontWeight="medium">
                            검색 결과: <b>{filteredMeetups.length}</b>개
                        </Box>
                    </Flex>
                </Box>

                <Flex justify="space-between" align="center" mb={4}>
                    <Heading size="md" color="gray.700">📋 모임 목록 ({filteredMeetups.length}개)</Heading>
                    <Button
                        onClick={handleExportMeetingExcel}
                        colorScheme="orange"
                        variant="solid"
                        size="sm"
                        borderRadius="xl"
                        fontWeight="bold"
                        leftIcon={<span>📥</span>}
                        _hover={{ bg: "orange.600" }}
                    >
                        모임목록 엑셀 다운로드
                    </Button>
                </Flex>

                <Box overflowX="auto" shadow="lg" borderRadius="2xl" bg="white">
                    <Table.Root variant="simple" size="lg">
                        <Table.Header bg="gray.100">
                            <Table.Row>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">번호</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">개설자 ID</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">개설자 프로필명</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">개설자 휴대번호</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">가입 회원 ID</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">가입 회원 프로필명</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">카테고리</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">모임명</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">장소</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">날짜</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">인원/정원</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">참가비</Table.ColumnHeader>
                                <Table.ColumnHeader px={4} py={4} whiteSpace="nowrap">시간</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {currentMeetups.map((meetup, index) => (
                                <Table.Row key={meetup.id} _hover={{ bg: "gray.50" }}>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">
                                        {indexOfFirstMeeting + index + 1}
                                    </Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{meetup.creatorUsername || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{meetup.creatorNickname || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{meetup.creatorPhone || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} maxW="200px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" title={meetup.memberUsernames || '-'}>
                                        {meetup.memberUsernames || '-'}
                                    </Table.Cell>
                                    <Table.Cell px={4} py={4} maxW="200px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" title={meetup.memberNicknames || '-'}>
                                        {meetup.memberNicknames || '-'}
                                    </Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">
                                        <Box px={2} py={1} borderRadius="md" bg="teal.50" color="teal.600" fontSize="xs" fontWeight="bold" display="inline-block">
                                            {{ 'EXERCISE_HEALTH': '운동/건강', 'CULTURE_ART': '문화/예술', 'TRAVEL': '여행', 'VOLUNTEER': '봉사' }[meetup.category] || meetup.category}
                                        </Box>
                                    </Table.Cell>
                                    <Table.Cell px={4} py={4} fontWeight="bold" whiteSpace="nowrap">{meetup.title}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{meetup.location || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{meetup.date || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">
                                        <b>{meetup.members}</b> / {meetup.maxMembers}
                                    </Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">{meetup.cost || '-'}</Table.Cell>
                                    <Table.Cell px={4} py={4} whiteSpace="nowrap">
                                        {meetup.startTime || '-'} ~ {meetup.endTime || '-'}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>

                {/* 모임 페이지네이션 */}
                {meetingTotalPages > 1 && (
                    <Box mt={6} display="flex" justifyContent="center" alignItems="center" gap={2}>
                        <button
                            onClick={() => setMeetingCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={meetingCurrentPage === 1}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: meetingCurrentPage === 1 ? '#f7fafc' : 'white',
                                color: meetingCurrentPage === 1 ? '#a0aec0' : '#4a5568',
                                cursor: meetingCurrentPage === 1 ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ◀ 이전
                        </button>
                        {Array.from({ length: meetingTotalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setMeetingCurrentPage(page)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: meetingCurrentPage === page ? '2px solid #319795' : '1px solid #e2e8f0',
                                    background: meetingCurrentPage === page ? '#319795' : 'white',
                                    color: meetingCurrentPage === page ? 'white' : '#4a5568',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    minWidth: '40px'
                                }}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setMeetingCurrentPage(prev => Math.min(prev + 1, meetingTotalPages))}
                            disabled={meetingCurrentPage === meetingTotalPages}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: meetingCurrentPage === meetingTotalPages ? '#f7fafc' : 'white',
                                color: meetingCurrentPage === meetingTotalPages ? '#a0aec0' : '#4a5568',
                                cursor: meetingCurrentPage === meetingTotalPages ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            다음 ▶
                        </button>
                    </Box>
                )}

                {/* 채팅 관리 섹션 구분선 */}
                <Box my={12} borderTop="2px dashed #e2e8f0" />

                {/* 채팅 관리 섹션 */}
                <Box mb={8} p={6} shadow="md" borderRadius="2xl" bg="gray.50" border="1px solid #e2e8f0">
                    <Heading size="md" mb={6} color="gray.700">💬 채팅 관리</Heading>

                    <Flex gap={4} mb={6}>
                        {[
                            { id: 'monitoring', label: '모니터링' },
                            { id: 'logs', label: '메시지 로그' },
                            { id: 'forbidden', label: '금칙어 관리' },
                            { id: 'reports', label: '신고 관리' },
                            { id: 'bans', label: '사용자 제재' }
                        ].map((tab) => (
                            <Button
                                key={tab.id}
                                variant={activeChatTab === tab.id ? "solid" : "outline"}
                                colorScheme="teal"
                                bg={activeChatTab === tab.id ? "teal.500" : "transparent"}
                                color={activeChatTab === tab.id ? "white" : "teal.600"}
                                _hover={{ bg: activeChatTab === tab.id ? "teal.600" : "teal.50" }}
                                onClick={() => setActiveChatTab(tab.id)}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </Flex>

                    {/* 1. 대화방 모니터링 (Mock Data) */}
                    {activeChatTab === 'monitoring' && (
                        <Box mb={8} bg="white" p={4} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.600">📡 대화방 모니터링</Heading>
                            <Table.Root variant="simple" size="sm">
                                <Table.Header bg="gray.100">
                                    <Table.Row>
                                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                                        <Table.ColumnHeader>참여자 1</Table.ColumnHeader>
                                        <Table.ColumnHeader>참여자 2</Table.ColumnHeader>
                                        <Table.ColumnHeader>상태</Table.ColumnHeader>
                                        <Table.ColumnHeader>생성일시</Table.ColumnHeader>
                                        <Table.ColumnHeader>관리</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>101</Table.Cell>
                                        <Table.Cell>user1</Table.Cell>
                                        <Table.Cell>user2</Table.Cell>
                                        <Table.Cell><Box color="green.500" fontWeight="bold">ACTIVE</Box></Table.Cell>
                                        <Table.Cell>2024-05-01 10:00</Table.Cell>
                                        <Table.Cell><Button size="xs" colorScheme="red">종료</Button></Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>102</Table.Cell>
                                        <Table.Cell>admin</Table.Cell>
                                        <Table.Cell>testuser</Table.Cell>
                                        <Table.Cell><Box color="orange.500" fontWeight="bold">PENDING</Box></Table.Cell>
                                        <Table.Cell>2024-05-02 14:30</Table.Cell>
                                        <Table.Cell><Button size="xs" colorScheme="red">종료</Button></Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
                        </Box>
                    )}

                    {/* 2. 메시지 로그 관리 (Mock Data) */}
                    {activeChatTab === 'logs' && (
                        <Box mb={8} bg="white" p={4} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.600">📜 메시지 로그 (최근 5건)</Heading>
                            <Table.Root variant="simple" size="sm">
                                <Table.Header bg="gray.100">
                                    <Table.Row>
                                        <Table.ColumnHeader>시간</Table.ColumnHeader>
                                        <Table.ColumnHeader>대화방 ID</Table.ColumnHeader>
                                        <Table.ColumnHeader>발신자</Table.ColumnHeader>
                                        <Table.ColumnHeader>내용</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>2024-05-02 14:35:10</Table.Cell>
                                        <Table.Cell>102</Table.Cell>
                                        <Table.Cell>testuser</Table.Cell>
                                        <Table.Cell>안녕하세요, 관리자님!</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>2024-05-02 14:35:15</Table.Cell>
                                        <Table.Cell>102</Table.Cell>
                                        <Table.Cell>admin</Table.Cell>
                                        <Table.Cell>반갑습니다. 무엇을 도와드릴까요?</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
                        </Box>
                    )}

                    {/* 3. 금칙어 관리 (Mock Data) */}
                    {activeChatTab === 'forbidden' && (
                        <Box mb={8} bg="white" p={4} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.600">🚫 금칙어 관리</Heading>
                            <Flex gap={2} mb={2}>
                                <input className="mooa-input" placeholder="추가할 금칙어 입력" style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                <Button size="sm" colorScheme="teal">추가</Button>
                            </Flex>
                            <Flex gap={2} mt={2}>
                                {['비속어1', '비속어2', '나쁜말'].map((word) => (
                                    <Box key={word} bg="red.50" color="red.600" px={3} py={1} borderRadius="full" fontSize="sm" fontWeight="bold">
                                        {word} <span style={{ cursor: 'pointer', marginLeft: '5px' }}>x</span>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                    )}

                    {/* 4. 신고 관리 (Mock Data) */}
                    {activeChatTab === 'reports' && (
                        <Box mb={8} bg="white" p={4} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.600">🚨 신고 접수 현황</Heading>
                            <Table.Root variant="simple" size="sm">
                                <Table.Header bg="red.50">
                                    <Table.Row>
                                        <Table.ColumnHeader>신고 ID</Table.ColumnHeader>
                                        <Table.ColumnHeader>신고자</Table.ColumnHeader>
                                        <Table.ColumnHeader>피신고자</Table.ColumnHeader>
                                        <Table.ColumnHeader>사유</Table.ColumnHeader>
                                        <Table.ColumnHeader>상태</Table.ColumnHeader>
                                        <Table.ColumnHeader>처리</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>R-001</Table.Cell>
                                        <Table.Cell>sunny</Table.Cell>
                                        <Table.Cell>angry_user</Table.Cell>
                                        <Table.Cell>욕설 및 비방</Table.Cell>
                                        <Table.Cell>접수</Table.Cell>
                                        <Table.Cell>
                                            <Button size="xs" colorScheme="red" mr={1}>제재</Button>
                                            <Button size="xs">기각</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
                        </Box>
                    )}

                    {/* 5. 사용자 제재 (Mock Data) */}
                    {activeChatTab === 'bans' && (
                        <Box bg="white" p={4} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.600">🔨 사용자 채팅 제재</Heading>
                            <Flex gap={2} mb={4}>
                                <input className="mooa-input" placeholder="사용자 ID 입력" style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                <select className="mooa-input" style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}>
                                    <option>3일 채팅 금지</option>
                                    <option>7일 채팅 금지</option>
                                    <option>영구 채팅 금지</option>
                                </select>
                                <Button size="sm" colorScheme="red">제재 적용</Button>
                            </Flex>
                            <Box fontSize="sm" color="gray.500">
                                * 현재 제재 중인 사용자: <b>banned_user</b> (영구 정지)
                            </Box>
                        </Box>
                    )}

                </Box>

                {/* 무아 정보 관리 섹션 (Mooa Info Management) */}
                <Box mb={8} p={6} shadow="md" borderRadius="2xl" bg="gray.50" border="1px solid #e2e8f0">
                    <Heading size="md" mb={6} color="gray.700">📰 무아 정보 관리</Heading>

                    <Flex gap={4} mb={6} overflowX="auto" pb={2}>
                        {[
                            { id: 'welfare', label: '복지정책' },
                            { id: 'local', label: '지자체소식' },
                            { id: 'hospital', label: '병원정보' },
                            { id: 'health', label: '건강상식' },
                            { id: 'book', label: '도서추천' },
                            { id: 'performance', label: '공연안내' }
                        ].map((tab) => (
                            <Button
                                key={tab.id}
                                variant={activeInfoTab === tab.id ? "solid" : "outline"}
                                colorScheme="blue"
                                size="sm"
                                bg={activeInfoTab === tab.id ? "blue.500" : "transparent"}
                                color={activeInfoTab === tab.id ? "white" : "blue.600"}
                                _hover={{ bg: activeInfoTab === tab.id ? "blue.600" : "blue.50" }}
                                onClick={() => setActiveInfoTab(tab.id)}
                                borderRadius="full"
                                px={5}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </Flex>

                    <Flex gap={8} direction="column">
                        {/* 상단: 게시글 목록 (List) */}
                        <Box width="100%" bg="white" p={4} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.600">
                                📋 등록된 게시글 목록
                            </Heading>
                            <Table.Root variant="simple" size="sm">
                                <Table.Header bg="gray.100">
                                    <Table.Row>
                                        <Table.ColumnHeader width="50px">ID</Table.ColumnHeader>
                                        <Table.ColumnHeader>이미지</Table.ColumnHeader>
                                        <Table.ColumnHeader>제목</Table.ColumnHeader>
                                        <Table.ColumnHeader>등록일</Table.ColumnHeader>
                                        <Table.ColumnHeader width="100px">관리</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {mockInfoPosts.filter(post => post.category === activeInfoTab).length > 0 ? (
                                        mockInfoPosts.filter(post => post.category === activeInfoTab).map((post) => (
                                            <Table.Row key={post.id} bg={editingPost?.id === post.id ? "blue.50" : "transparent"}>
                                                <Table.Cell>{post.id}</Table.Cell>
                                                <Table.Cell>
                                                    <Box w="40px" h="40px" bg="gray.200" borderRadius="md" overflow="hidden">
                                                        <img src={post.image} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </Box>
                                                </Table.Cell>
                                                <Table.Cell fontWeight="bold">{post.title}</Table.Cell>
                                                <Table.Cell>{post.date}</Table.Cell>
                                                <Table.Cell>
                                                    <Flex gap={2}>
                                                        <Button size="xs" bg="green.500" color="white" _hover={{ bg: "green.600" }} onClick={() => handleEditClick(post)}>수정</Button>
                                                        <Button size="xs" bg="red.500" color="white" _hover={{ bg: "red.600" }}>삭제</Button>
                                                    </Flex>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    ) : (
                                        <Table.Row>
                                            <Table.Cell colSpan={5} textAlign="center" py={4} color="gray.500">
                                                해당 카테고리에 등록된 게시글이 없습니다.
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table.Root>
                        </Box>

                        {/* 하단: 새 글 작성 (Write Form) */}
                        <Box width="100%" bg="white" p={4} borderRadius="xl" shadow="sm" border="1px solid #eee">
                            <Flex justify="space-between" align="center" mb={4}>
                                <Heading size="sm" color="gray.600">
                                    {editingPost ? `✏️ 게시글 수정 (ID: ${editingPost.id})` : '✏️ 새 글 등록'}
                                </Heading>
                                {editingPost && (
                                    <Button size="xs" onClick={handleCancelEdit} variant="outline" colorScheme="gray">
                                        수정 취소
                                    </Button>
                                )}
                            </Flex>
                            <VStack spacing={4} align="stretch">
                                <Box>
                                    <Flex justify="space-between" align="center" mb={1}>
                                        <Text fontSize="xs" fontWeight="bold" color="gray.500">제목</Text>
                                        <Flex gap={2}>
                                            <select
                                                className="mooa-input"
                                                value={titleFont}
                                                onChange={(e) => setTitleFont(e.target.value)}
                                                style={{ fontSize: '11px', padding: '2px 5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                            >
                                                {fontOptions.map(f => <option key={f} value={f}>{f}</option>)}
                                            </select>
                                            <select
                                                className="mooa-input"
                                                value={titleSize}
                                                onChange={(e) => setTitleSize(e.target.value)}
                                                style={{ fontSize: '11px', padding: '2px 5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                            >
                                                {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </Flex>
                                    </Flex>
                                    <input
                                        className="mooa-input"
                                        placeholder="제목을 입력하세요"
                                        value={infoTitle}
                                        onChange={(e) => setInfoTitle(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '1px solid #e2e8f0',
                                            fontFamily: titleFont,
                                            fontSize: titleSize
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Flex justify="space-between" align="center" mb={1}>
                                        <Text fontSize="xs" fontWeight="bold" color="gray.500">요약 (Summary)</Text>
                                        <Flex gap={2}>
                                            <select
                                                className="mooa-input"
                                                value={summaryFont}
                                                onChange={(e) => setSummaryFont(e.target.value)}
                                                style={{ fontSize: '11px', padding: '2px 5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                            >
                                                {fontOptions.map(f => <option key={f} value={f}>{f}</option>)}
                                            </select>
                                            <select
                                                className="mooa-input"
                                                value={summarySize}
                                                onChange={(e) => setSummarySize(e.target.value)}
                                                style={{ fontSize: '11px', padding: '2px 5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                            >
                                                {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </Flex>
                                    </Flex>
                                    <textarea
                                        className="mooa-input"
                                        placeholder="간단한 요약을 입력하세요"
                                        rows="3"
                                        value={infoSummary}
                                        onChange={(e) => setInfoSummary(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '1px solid #e2e8f0',
                                            resize: 'none',
                                            fontFamily: summaryFont,
                                            fontSize: summarySize
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text fontSize="xs" fontWeight="bold" mb={1} color="gray.500">대표 이미지</Text>
                                    <Box p={4} border="2px dashed #e2e8f0" borderRadius="xl" textAlign="center" cursor="pointer" _hover={{ bg: 'gray.50', borderColor: 'blue.300' }}>
                                        <Box fontSize="2xl" mb={2}>🖼️</Box>
                                        <Text fontSize="xs" color="gray.500">클릭하여 이미지 업로드</Text>
                                    </Box>
                                </Box>
                                <Button colorScheme={editingPost ? "green" : "blue"} width="full" mt={2} onClick={handleMooaSubmit}>
                                    {editingPost ? "수정하기" : "등록하기"}
                                </Button>
                            </VStack>
                        </Box>
                    </Flex>

                </Box>
            </Box>
            <Footer />
        </Flex>
    );
};

export default AdminPage;

