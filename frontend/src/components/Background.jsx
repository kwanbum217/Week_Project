import React from 'react';

// Love Letter 브랜드 배경 컴포넌트 - 다크하고 네온 느낌의 디자인
const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--love-bg-main)' }}>
      {/* 메인 그라데이션 오버레이 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(74, 222, 128, 0.05) 0%, transparent 50%)'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)'
        }}
      />

      {/* 부드러운 원형 장식 - 그린 */}
      <div
        className="absolute animate-float-gentle"
        style={{
          top: '-5%',
          left: '-5%',
          width: '40vh',
          height: '40vh',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 부드러운 원형 장식 - 다크 그린 */}
      <div
        className="absolute animate-float-gentle"
        style={{
          bottom: '-10%',
          right: '-5%',
          width: '50vh',
          height: '50vh',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(21, 128, 61, 0.05) 100%)',
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
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.03) 0%, transparent 70%)',
        }}
      />

      {/* 작은 장식 요소들 */}
      <div
        className="absolute animate-pulse-soft"
        style={{
          top: '20%',
          right: '20%',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'var(--love-green)',
          boxShadow: '0 0 10px var(--love-green)',
          opacity: 0.6,
        }}
      />
      <div
        className="absolute animate-pulse-soft"
        style={{
          bottom: '30%',
          left: '15%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--love-green-dark)',
          boxShadow: '0 0 10px var(--love-green-dark)',
          opacity: 0.5,
          animationDelay: '1s',
        }}
      />
      <div
        className="absolute animate-pulse-soft"
        style={{
          top: '60%',
          right: '10%',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: 'var(--love-green)',
          boxShadow: '0 0 8px var(--love-green)',
          opacity: 0.7,
          animationDelay: '2s',
        }}
      />
    </div>
  );
};

export default Background;
