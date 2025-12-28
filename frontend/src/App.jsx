import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <Background />
        <Navbar />
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

        {/* Customer Support AI Chat */}
        <CustomerSupportChat />
      </div>
    </Router>
  );
}

export default App;
