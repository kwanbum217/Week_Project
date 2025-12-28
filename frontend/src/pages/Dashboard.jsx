import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    navigate('/login');
    return null;
  }

  const features = [
    {
      icon: '👥',
      title: '친구 찾기',
      description: '새로운 친구를 만나보세요',
      path: '/match',
      colorClass: 'orange'
    },
    {
      icon: '💬',
      title: '대화하기',
      description: '친구들과 이야기해요',
      path: '/chat',
      colorClass: 'blue'
    },
    {
      icon: '📞',
      title: '음성통화',
      description: '목소리로 소통하세요',
      path: '/voice',
      colorClass: 'orange'
    },
    {
      icon: '❤️',
      title: '관심목록',
      description: '관심있는 친구들',
      path: '/match',
      colorClass: 'blue'
    }
  ];

  return (
    <div
      className="min-h-screen pt-24 pb-12 px-4"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* 환영 메시지 */}
        <div className="mooa-card mb-8 text-center animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
            style={{ background: 'var(--mooa-gradient)' }}
          >
            <span className="text-4xl">👋</span>
          </div>
          <h1
            className="mb-2"
            style={{ color: 'var(--mooa-navy)', fontSize: 'var(--font-size-3xl)' }}
          >
            {user.username}님, 환영합니다!
          </h1>
          <p style={{ color: 'var(--mooa-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            오늘도 MOOA에서 즐거운 하루 되세요 ☀️
          </p>

          {/* 사용자 정보 배지 */}
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            {user.location && (
              <span
                className="px-4 py-2 rounded-full text-lg"
                style={{
                  background: 'var(--mooa-bg-warm)',
                  color: 'var(--mooa-text-primary)',
                  border: '1px solid rgba(245, 166, 35, 0.2)'
                }}
              >
                📍 {user.location}
              </span>
            )}
            {user.gender && (
              <span
                className="px-4 py-2 rounded-full text-lg"
                style={{
                  background: 'var(--mooa-bg-warm)',
                  color: 'var(--mooa-text-primary)',
                  border: '1px solid rgba(93, 173, 226, 0.2)'
                }}
              >
                {user.gender === 'male' ? '👨' : user.gender === 'female' ? '👩' : '🧑'} {user.gender === 'male' ? '남성' : user.gender === 'female' ? '여성' : '기타'}
              </span>
            )}
          </div>
        </div>

        {/* 기능 카드 그리드 */}
        <h2
          className="mb-6"
          style={{ color: 'var(--mooa-navy)', fontSize: 'var(--font-size-2xl)' }}
        >
          무엇을 하시겠어요?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="mooa-feature-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(feature.path)}
            >
              <div className={`icon ${feature.colorClass}`}>
                <span>{feature.icon}</span>
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ color: 'var(--mooa-navy)', fontSize: 'var(--font-size-xl)' }}
              >
                {feature.title}
              </h3>
              <p style={{ color: 'var(--mooa-text-secondary)', fontSize: 'var(--font-size-base)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 빠른 시작 섹션 */}
        <div
          className="mooa-card animate-fade-in"
          style={{
            background: 'var(--mooa-gradient)',
            color: 'white'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="font-bold mb-2"
                style={{ fontSize: 'var(--font-size-2xl)' }}
              >
                💡 오늘의 추천
              </h3>
              <p style={{ fontSize: 'var(--font-size-lg)', opacity: 0.9 }}>
                새로운 친구와 대화를 시작해보세요!
              </p>
            </div>
            <button
              onClick={() => navigate('/match')}
              className="px-8 py-4 bg-white rounded-2xl font-bold transition-all hover:shadow-lg hover:-translate-y-1"
              style={{
                color: 'var(--mooa-orange)',
                fontSize: 'var(--font-size-lg)',
                minWidth: '180px'
              }}
            >
              친구 찾기 →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
