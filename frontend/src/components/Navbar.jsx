import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// MOOA 네비게이션 컴포넌트
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Zoom state
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Initialize zoom from session or default
  useEffect(() => {
    // Optional: Load saved zoom level if you want persistence
  }, []);

  const handleZoom = (level) => {
    setZoomLevel(level);
    document.documentElement.style.fontSize = `${level}%`;
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { path: '/main', label: '홈', icon: '🏠' },
    { path: '/match', label: '친구찾기', icon: '👥' },
    { path: '/meetup', label: '모임하기', icon: '🫂' },
    { path: '/chat', label: '대화하기', icon: '💬' },
    { path: '/market', label: '무아나눔', icon: '🛒' },
    { path: '/info', label: '무아정보', icon: 'ℹ️' },
    { path: '/intro', label: '무아소개', icon: '👋' },
  ];

  // 퍼블릭 메뉴 아이템 (비로그인 시)
  const publicNavItems = [
    { label: '홈', path: '/main' },
    { label: '친구찾기', path: '/match' },
    { label: '모임하기', path: '/meetup' },
    { label: '대화하기', path: '/chat' },
    { label: '무아나눔', path: '/market' },
    { label: '무아정보', path: '/info' },
    { label: '무아소개', path: '/intro' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(30, 58, 95, 0.08)',
        boxShadow: '0 2px 16px rgba(30, 58, 95, 0.06)',
        paddingTop: '30px',
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-[1980px] mx-auto px-[200px] h-32 flex justify-center items-center gap-12">

          {/* Left Column: Logo */}
          <Link to="/main" className="flex-shrink-0 block" style={{ marginLeft: '-10px' }}>
            <img
              src="/img/mooa_logo_main.png"
              alt="MOOA Logo"
              className="w-[100px] h-[100px] min-w-[100px] min-h-[100px]"
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          </Link>

          {/* Right Column: Search/Utils + Menu */}
          <div className="relative flex flex-col w-fit">

            {/* Row 1: Search Bar (Left) + Utility Buttons (Right) */}
            <div className="flex justify-between items-center mb-1 w-full">
              {/* Search Bar */}
              <div
                className="relative w-[500px] rounded-full"
                style={{ background: 'var(--mooa-gradient)', padding: '2px' }}
              >
                <div className="relative w-full bg-white rounded-full flex items-center">
                  <input
                    type="text"
                    placeholder=" 궁금하신 내용을 이곳에 입력해 보세요."
                    className="w-full py-3 pr-12 bg-transparent border-none focus:ring-0 rounded-full text-sm"
                    style={{
                      outline: 'none',
                      transform: 'scale(0.8)',
                      transformOrigin: 'left center',
                      width: '125%',
                      paddingLeft: '30px'
                    }}
                  />
                  <button className="absolute right-4 text-[#1E3A5F] hover:text-[#F5A623] transition-colors top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Utility Buttons */}
              <div className="flex items-center gap-2" style={{ whiteSpace: 'nowrap' }}>
                {!user ? (
                  <>
                    <button
                      onClick={() => navigate('/login')}
                      className="text-[7px] font-medium text-[var(--mooa-navy)] hover:text-orange-500 transition-colors flex items-center gap-1"
                      style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}
                    >
                      로그인
                      <svg className="w-5 h-5" fill="none" stroke="#1E3A5F" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="text-[7px] font-medium text-[var(--mooa-navy)] hover:text-orange-500 transition-colors flex items-center gap-1"
                      style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}
                    >
                      무아가입
                      <svg className="w-5 h-5" fill="none" stroke="#FF6B00" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/dashboard"
                      className="text-[7px] font-medium text-[var(--mooa-navy)] hover:text-orange-500 transition-colors flex items-center gap-1"
                      style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}
                    >
                      나의활동
                      <svg className="w-5 h-5" fill="none" stroke="#1E3A5F" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-[7px] font-medium text-[var(--mooa-navy)] hover:text-red-500 transition-colors flex items-center gap-1"
                      style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}
                    >
                      로그아웃
                      <svg className="w-5 h-5" fill="none" stroke="#FF6B00" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Main Menu + Screen Size */}
            <div className="flex justify-between items-center w-full whitespace-nowrap" style={{ marginTop: '24px' }}>
              {(!user ? publicNavItems : navItems).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-lg font-bold text-[#333] transition-all duration-200 ease-in-out px-3 py-2 rounded-lg"
                  style={{
                    ':hover': {
                      color: '#FF6B00',
                      transform: 'scale(1.05)',
                      backgroundColor: 'rgba(255, 107, 0, 0.1)'
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#FF6B00';
                    e.target.style.transform = 'scale(1.08)';
                    e.target.style.backgroundColor = 'rgba(255, 107, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = location.pathname === item.path ? '#FF6B00' : '#333';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Screen Size Dropdown Moved Here - Next to Intro */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-lg font-bold text-[#333] hover:text-[#FF6B00] transition-colors flex items-center gap-1"
                >
                  화면크기
                  <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-6 z-50">
                    {[
                      { label: '작게', size: 90, fontSize: '12px' },
                      { label: '보통', size: 100, fontSize: '14px' },
                      { label: '조금 크게', size: 110, fontSize: '16px' },
                      { label: '크게', size: 120, fontSize: '18px' },
                      { label: '가장 크게', size: 130, fontSize: '20px' },
                    ].map((option) => {
                      const isActive = zoomLevel === option.size;
                      return (
                        <button
                          key={option.size}
                          onClick={() => handleZoom(option.size)}
                          className={`w-full text-left pl-6 pr-4 py-3 rounded-lg text-sm flex items-center gap-4 transition-colors ${isActive ? 'bg-[#F0F7FF]' : 'hover:bg-gray-50'}`}
                        >
                          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium border ${isActive ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-gray-400 border-gray-300'}`}>가</span>
                          <span className={isActive ? 'text-[#1E3A5F] font-semibold' : 'text-gray-600'} style={{ fontSize: option.fontSize }}>{option.label}</span>
                        </button>
                      );
                    })}
                    <div className="border-t border-gray-400 mt-2 pt-2 pb-1">
                      <button onClick={() => handleZoom(100)} className="w-full text-center py-2 text-sm text-gray-500 hover:text-gray-800 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        초기화
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
