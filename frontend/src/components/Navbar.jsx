import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// MOOA 네비게이션 컴포넌트
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // 로그인/회원가입 페이지에서는 네비게이션 숨김
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: '홈', icon: '🏠' },
    { path: '/match', label: '친구 찾기', icon: '👥' },
    { path: '/chat', label: '대화하기', icon: '💬' },
    { path: '/voice', label: '음성통화', icon: '📞' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(30, 58, 95, 0.08)',
        boxShadow: '0 2px 16px rgba(30, 58, 95, 0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <img
              src="/img/MOOA_LOGO_NEW.jpg"
              alt="MOOA 로고"
              className="h-12 w-auto rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span
                className="text-2xl font-bold"
                style={{ color: 'var(--mooa-navy)' }}
              >
                MOOA
              </span>
              <span
                className="block text-sm"
                style={{ color: 'var(--mooa-text-muted)' }}
              >
                무아
              </span>
            </div>
          </Link>

          {/* 네비게이션 메뉴 */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mooa-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* 사용자 정보 & 로그아웃 */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p
                  className="font-semibold"
                  style={{ color: 'var(--mooa-text-primary)', fontSize: '16px' }}
                >
                  {user.username}님
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--mooa-text-muted)' }}
                >
                  환영합니다
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="mooa-btn-outline"
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  minHeight: 'auto'
                }}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
