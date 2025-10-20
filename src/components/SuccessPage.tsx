import { useEffect, useState } from 'react';

const SuccessPage = () => {
  const [visible, setVisible] = useState(false);
  const [heartsVisible, setHeartsVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), 300);
    const timer2 = setTimeout(() => setHeartsVisible(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <div 
        className="relative"
        style={{
          transform: visible ? 'scale(1)' : 'scale(0)',
          transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 opacity-60 animate-pulse"></div>
        
        <svg 
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-2xl" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{
            animation: 'heartBeat 1.5s ease-in-out infinite'
          }}
        >
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill="url(#successGradient)"
          />
          <defs>
            <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-0 left-0 text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>✨</div>
        <div className="absolute top-0 right-0 text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2s' }}>✨</div>
        <div className="absolute bottom-0 left-0 text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2s' }}>✨</div>
        <div className="absolute bottom-0 right-0 text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }}>✨</div>
      </div>

      <div 
        className="mt-8 sm:mt-12 text-center px-4"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 1s ease-out 0.5s',
          opacity: visible ? 1 : 0,
        }}
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl mb-4 leading-relaxed">
          🎉 Cảm ơn em đã cho anh cơ hội yêu em 🎉
        </h1>
        
      </div>

      {heartsVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10%',
                animation: `floatUp ${3 + Math.random() * 4}s ease-in infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['💕', '💖', '💗', '💓', '💝', '❤️', '💘'][Math.floor(Math.random() * 7)]}
            </div>
          ))}
        </div>
      )}

      {heartsVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {['🎊', '🎉', '⭐', '🌟', '✨', '💫'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes heartBeat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.1);
          }
          20%, 40% {
            transform: scale(1);
          }
        }
        
        @keyframes floatUp {
          from {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          to {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fall {
          from {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          to {
            transform: translateY(120vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
