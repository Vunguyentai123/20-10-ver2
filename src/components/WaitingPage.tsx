import { useEffect, useState } from 'react';

const WaitingPage = () => {
  const [visible, setVisible] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), 300);
    const timer2 = setTimeout(() => setParticlesVisible(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div 
        className="relative"
        style={{
          transform: visible ? 'scale(1)' : 'scale(0)',
          transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-60 animate-pulse"></div>
        
        <svg 
          className="relative w-64 h-64 drop-shadow-2xl" 
          viewBox="0 0 200 200" 
          fill="none"
          style={{
            animation: 'clockTick 2s ease-in-out infinite'
          }}
        >
          {/* Outer circle with gradient */}
          <circle 
            cx="100" 
            cy="100" 
            r="90" 
            fill="url(#clockGradient)" 
          />
          
          {/* Inner white face */}
          <circle 
            cx="100" 
            cy="100" 
            r="80" 
            fill="white"
            stroke="url(#clockGradient)" 
            strokeWidth="4"
          />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const innerR = 65;
            const outerR = 75;
            return (
              <line
                key={i}
                x1={100 + innerR * Math.cos(angle)}
                y1={100 + innerR * Math.sin(angle)}
                x2={100 + outerR * Math.cos(angle)}
                y2={100 + outerR * Math.sin(angle)}
                stroke="url(#clockGradient)"
                strokeWidth={i % 3 === 0 ? 3 : 2}
                strokeLinecap="round"
              />
            );
          })}
          
          {/* Hour hand */}
          <line 
            x1="100" 
            y1="100" 
            x2="100" 
            y2="50" 
            stroke="url(#clockGradient)" 
            strokeWidth="6" 
            strokeLinecap="round"
            style={{
              transformOrigin: '100px 100px',
              animation: 'rotateHour 12s linear infinite'
            }}
          />
          
          {/* Minute hand */}
          <line 
            x1="100" 
            y1="100" 
            x2="140" 
            y2="100" 
            stroke="url(#clockGradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
            style={{
              transformOrigin: '100px 100px',
              animation: 'rotateMinute 3s linear infinite'
            }}
          />
          
          {/* Center dot */}
          <circle cx="100" cy="100" r="8" fill="url(#clockGradient)" />
          <circle cx="100" cy="100" r="5" fill="white" />
          
          <defs>
            <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-0 left-0 text-4xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>⏰</div>
        <div className="absolute top-0 right-0 text-4xl animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2s' }}>⏰</div>
        <div className="absolute bottom-0 left-0 text-4xl animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2s' }}>⏰</div>
        <div className="absolute bottom-0 right-0 text-4xl animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }}>⏰</div>
      </div>

      <div 
        className="mt-12 text-center px-4"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 1s ease-out 0.5s',
          opacity: visible ? 1 : 0,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl mb-4">
          Anh sẽ đợi câu trả lời từ em 💙
        </h1>
      </div>

      {particlesVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
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
              {['⏰', '⏳', '🕐', '🕑', '🕒', '💙', '💜'][Math.floor(Math.random() * 7)]}
            </div>
          ))}
        </div>
      )}

      {particlesVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
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
              {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes clockTick {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes rotateHour {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateMinute {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default WaitingPage;
