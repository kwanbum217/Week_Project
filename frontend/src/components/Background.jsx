import React from 'react';

// MOOA 브랜드 배경 컴포넌트 - 따뜻하고 친근한 디자인
const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8E7 0%, #FFFEF7 50%, #F5E6D3 100%)' }}>
      {/* 메인 그라데이션 오버레이 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(245, 166, 35, 0.15) 0%, transparent 50%)'
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 80%, rgba(93, 173, 226, 0.12) 0%, transparent 50%)'
        }}
      />

      {/* 부드러운 원형 장식 - 오렌지 */}
      <div 
        className="absolute animate-float-gentle"
        style={{
          top: '-5%',
          left: '-5%',
          width: '40vh',
          height: '40vh',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 213, 128, 0.4) 0%, rgba(245, 166, 35, 0.2) 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 부드러운 원형 장식 - 블루 */}
      <div 
        className="absolute animate-float-gentle"
        style={{
          bottom: '-10%',
          right: '-5%',
          width: '50vh',
          height: '50vh',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(133, 199, 242, 0.3) 0%, rgba(93, 173, 226, 0.15) 100%)',
          filter: 'blur(60px)',
          animationDelay: '2s',
        }}
      />

      {/* 중앙 하이라이트 */}
      <div 
        className="absolute animate-pulse-soft"
        style={{
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vh',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
        }}
      />

      {/* 작은 장식 요소들 */}
      <div 
        className="absolute animate-pulse-soft"
        style={{
          top: '20%',
          right: '20%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--mooa-orange)',
          opacity: 0.4,
        }}
      />
      <div 
        className="absolute animate-pulse-soft"
        style={{
          bottom: '30%',
          left: '15%',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'var(--mooa-blue)',
          opacity: 0.3,
          animationDelay: '1s',
        }}
      />
      <div 
        className="absolute animate-pulse-soft"
        style={{
          top: '60%',
          right: '10%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--mooa-orange)',
          opacity: 0.5,
          animationDelay: '2s',
        }}
      />
    </div>
  );
};

export default Background;
