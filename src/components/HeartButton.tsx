interface HeartButtonProps {
  onClick: () => void;
}

const HeartButton = ({ onClick }: HeartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative inline-block cursor-pointer py-4"
    >
      <div className="relative flex items-center justify-center gap-0">
        <div className="relative z-10 transition-all duration-[1500ms] ease-in-out group-hover:-translate-x-8 sm:group-hover:-translate-x-16">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-[1500ms] animate-pulse"></div>
          
          <svg 
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative transition-all duration-[1500ms] ease-in-out group-hover:scale-110 left-heart" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              style={{
                fill: 'url(#heartGradientLeft)'
              }}
            />
            <defs>
              <linearGradient id="heartGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-20 overflow-hidden transition-all duration-[1500ms] ease-in-out opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs -mx-4 sm:-mx-8">
          <div className="bg-white/95 backdrop-blur-sm px-6 sm:px-10 py-3 sm:py-4 rounded-2xl border-2 sm:border-4 border-pink-500 shadow-2xl whitespace-nowrap">
            <span className="relative z-30 text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-shimmer">
              Click me
            </span>
          </div>
        </div>

        {/* Right Heart - moves right on hover and overlaps box */}
        <div className="relative z-10 transition-all duration-[1500ms] ease-in-out group-hover:translate-x-8 sm:group-hover:translate-x-16">
          {/* Glow effect for right heart */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-[1500ms] animate-pulse"></div>
          
          <svg 
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative transition-all duration-[1500ms] ease-in-out group-hover:scale-110 right-heart" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              style={{
                fill: 'url(#heartGradientRight)'
              }}
            />
            <defs>
              <linearGradient id="heartGradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Initial single heart (hidden on hover, delayed appearance on unhover) */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 delay-700 opacity-100 group-hover:opacity-0 group-hover:duration-300 group-hover:delay-0 z-10">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
          <svg 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 relative transition-transform duration-[1500ms] ease-in-out group-hover:scale-95 center-heart" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              style={{
                fill: 'url(#heartGradientInitial)'
              }}
            />
            <defs>
              <linearGradient id="heartGradientInitial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

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
        
        @keyframes heartBeatRotateRight {
          0%, 100% {
            transform: scale(1) rotate(12deg);
          }
          10%, 30% {
            transform: scale(1.1) rotate(12deg);
          }
          20%, 40% {
            transform: scale(1) rotate(12deg);
          }
        }
        
        @keyframes heartBeatRotateLeft {
          0%, 100% {
            transform: scale(1) rotate(-12deg);
          }
          10%, 30% {
            transform: scale(1.1) rotate(-12deg);
          }
          20%, 40% {
            transform: scale(1) rotate(-12deg);
          }
        }
        
        .left-heart {
          animation: heartBeat 1.5s ease-in-out infinite;
        }
        
        .right-heart {
          animation: heartBeat 1.5s ease-in-out infinite;
        }
        
        .center-heart {
          animation: heartBeat 1.5s ease-in-out infinite;
        }
        
        .group:hover .left-heart {
          animation: heartBeatRotateRight 1.5s ease-in-out infinite;
        }
        
        .group:hover .right-heart {
          animation: heartBeatRotateLeft 1.5s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
};

export default HeartButton;
