import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Match from './pages/Match';
import Meetup from './pages/Meetup';
import Market from './pages/Market';
import Info from './pages/Info';
import TermsOfService from './pages/TermsOfService';
import Intro from './pages/Intro';
import VoiceChat from './pages/VoiceChat';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerSupportChat from './components/CustomerSupportChat';
import Background from './components/Background';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';

import LandingPage from './pages/LandingPage';
import './App.css';

// INTERNAL PRIVACY POLICY COMPONENT TO GUARANTEE RENDERING
const InternalPrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      position: 'relative',
      zIndex: 9999,
      backgroundColor: 'var(--love-gray-dark)',
      padding: '40px',
      margin: '20px auto',
      maxWidth: '1000px',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      minHeight: '80vh',
      color: 'var(--love-text-primary)',
      fontFamily: 'sans-serif',
      border: '1px solid var(--love-gray-light)'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', borderBottom: '1px solid var(--love-gray-light)', paddingBottom: '15px', color: 'var(--love-green)' }}>
        개인정보처리방침
      </h1>

      <div style={{ lineHeight: '1.6' }}>
        <p style={{ marginBottom: '20px' }}>
          주식회사 무아(이하 '회사')는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', color: 'var(--love-green)' }}>
          제1조 (개인정보의 처리목적)
        </h3>
        <p style={{ marginBottom: '10px' }}>회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li><strong>홈페이지 회원 가입 및 관리</strong>: 회원가입 의사 확인, 본인 식별/인증, 회원자격 유지/관리</li>
          <li><strong>재화 또는 서비스 제공</strong>: 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공</li>
          <li><strong>마케팅 및 광고에의 활용</strong>: 이벤트 정보 제공 및 참여기회 제공</li>
        </ul>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', color: 'var(--love-green)' }}>
          제2조 (개인정보의 처리 및 보유기간)
        </h3>
        <p style={{ marginBottom: '10px' }}>회사는 법령에 따른 개인정보 보유/이용기간 또는 정보주체로부터 수집 시 동의받은 기간 내에서 처리/보유합니다.</p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', color: 'var(--love-green)' }}>
          제3조 (개인정보 보호책임자)
        </h3>
        <div style={{ backgroundColor: 'var(--love-gray)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--love-green)' }}>
          <p style={{ margin: '5px 0' }}><strong>성명</strong>: 이보안</p>
          <p style={{ margin: '5px 0' }}><strong>직책</strong>: 보안팀장</p>
          <p style={{ margin: '5px 0' }}><strong>연락처</strong>: 02-1234-5678, support@mooa-app.com</p>
        </div>

        <div style={{ textAlign: 'right', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--love-gray-light)', fontSize: '0.9rem', color: 'var(--love-text-secondary)' }}>
          <p>공고일자: 2026년 1월 2일</p>
          <p>시행일자: 2026년 1월 2일</p>
        </div>
      </div>
    </div>
  );
};

// Create an inner Layout component to use router hooks
const Layout = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Auto-login as Guest if no user is found
      const guestUser = {
        // Default guest
        username: 'Guest',
        location: '서울',
        gender: 'male',
        email: 'guest@example.com'
      };
      localStorage.setItem('user', JSON.stringify(guestUser));
      setUser(guestUser);
      // Trigger storage event for other components if needed
      window.dispatchEvent(new Event('storage'));
    }

    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check if we are on the Chat page
  const isChatPage = location.pathname === '/chat';

  return (
    <div className="min-h-screen relative">
      <Background />
      <Navbar />
      {/* Remove side margin on Chat page to give it full width */}
      <div style={{ paddingTop: '180px' }}>
        <Routes>
          {/* Main Entry Rule: Redirect Root to /main */}
          <Route path="/" element={<Navigate to="/main" replace />} />

          <Route path="/privacy-policy" element={<InternalPrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Public Main Page (Rich Design: Friends, Meetings, Chat... as requested) */}
          <Route path="/main" element={<LandingPage />} />

          <Route path="/intro" element={<Intro />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />



          {/* Public Preview Routes */}
          <Route path="/match" element={<Match />} />
          <Route path="/meetup" element={<Meetup />} />
          <Route path="/market" element={<Market />} />
          <Route path="/info" element={<Info />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:roomId" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/voice" element={<VoiceChat />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        </Routes>
      </div>



      <CustomerSupportChat />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;