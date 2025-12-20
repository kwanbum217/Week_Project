import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#4ade80] via-[#22c55e] to-[#16a34a]">
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />

      {/* Floating Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-gradient-to-br from-[#86efac] to-[#22c55e] opacity-40 blur-3xl animate-float-slow" />
      <div className="absolute top-[20%] right-[-5%] w-[40vh] h-[40vh] rounded-full bg-gradient-to-bl from-[#bbf7d0] to-[#4ade80] opacity-30 blur-2xl animate-float-medium" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60vh] h-[60vh] rounded-full bg-gradient-to-tr from-[#4ade80] to-[#15803d] opacity-30 blur-3xl animate-float-fast" />
      <div className="absolute bottom-[10%] right-[10%] w-[30vh] h-[30vh] rounded-full bg-gradient-to-tl from-[#86efac] to-[#22c55e] opacity-20 blur-2xl animate-float-medium" />

      {/* Small particles */}
      <div className="absolute top-[15%] left-[15%] w-4 h-4 rounded-full bg-white opacity-20 animate-pulse" />
      <div className="absolute top-[45%] right-[25%] w-6 h-6 rounded-full bg-white opacity-10 animate-pulse delay-700" />
      <div className="absolute bottom-[25%] left-[35%] w-3 h-3 rounded-full bg-white opacity-20 animate-pulse delay-300" />
    </div>
  );
};

export default Background;
