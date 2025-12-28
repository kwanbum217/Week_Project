import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Match from './pages/Match';
import VoiceChat from './pages/VoiceChat';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerSupportChat from './components/CustomerSupportChat';
import Background from './components/Background';
import Navbar from './components/Navbar';
import OnlineUsers from './components/OnlineUsers';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // localStorage 변경 감지
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

  return (
    <Router>
      <div className="min-h-screen relative">
        <Background />
        <Navbar />
        <div className={user ? 'mr-[280px]' : ''}> {/* 사이드바 공간 확보 */}
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/match" element={
              <ProtectedRoute>
                <Match />
              </ProtectedRoute>
            } />
            <Route path="/voice" element={
              <ProtectedRoute>
                <VoiceChat />
              </ProtectedRoute>
            } />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          </Routes>
        </div>

        {/* Online Users Sidebar - 로그인 후에만 표시 */}
        {user && <OnlineUsers currentUser={user} />}

        {/* Customer Support AI Chat */}
        <CustomerSupportChat />
      </div>
    </Router>
  );
}

export default App;

