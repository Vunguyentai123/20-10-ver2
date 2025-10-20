import { useState, useEffect } from 'react';

interface ConfessionPageProps {
  onAccept: () => void;
  onWait: () => void;
}

const ConfessionPage = ({ onAccept, onWait }: ConfessionPageProps) => {
  const [textVisible, setTextVisible] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [acceptClicks, setAcceptClicks] = useState(0);
  const [noClicks, setNoClicks] = useState(0);

  const sendClickDataToServer = async (buttonType: 'accept' | 'no', count: number) => {
    try {
      console.log(`Button "${buttonType}" clicked ${count} times`);
    } catch (error) {
      console.error('Error sending click data:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextVisible(true);
      setShowButtons(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const newNoClicks = noClicks + 1;
    setNoClicks(newNoClicks);
    sendClickDataToServer('no', newNoClicks);
    
    const buttonWidth = 220;
    const buttonHeight = 70;
    const textHeight = 200;
    const acceptButtonWidth = 170;
    const acceptButtonHeight = 70;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const margin = 30;
    
    const textLeft = centerX - 400 - margin;
    const textRight = centerX + 400 + margin;
    const textTop = centerY - textHeight / 2 - margin;
    const textBottom = centerY + textHeight / 2 + margin;
    
    const acceptButtonLeft = centerX - acceptButtonWidth - 40 - margin;
    const acceptButtonRight = centerX - 40 + margin;
    const acceptButtonTop = centerY + 128 - margin;
    const acceptButtonBottom = centerY + 128 + acceptButtonHeight + margin;
    
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      newX = Math.random() * (window.innerWidth - buttonWidth - 40) + 20;
      newY = Math.random() * (window.innerHeight - buttonHeight - 40) + 20;
      
      attempts++;
      
      const noButtonLeft = newX;
      const noButtonRight = newX + buttonWidth;
      const noButtonTop = newY;
      const noButtonBottom = newY + buttonHeight;
      
      const overlapWithText = !(
        noButtonRight < textLeft ||
        noButtonLeft > textRight ||
        noButtonBottom < textTop ||
        noButtonTop > textBottom
      );
      
      const overlapWithAcceptButton = !(
        noButtonRight < acceptButtonLeft ||
        noButtonLeft > acceptButtonRight ||
        noButtonBottom < acceptButtonTop ||
        noButtonTop > acceptButtonBottom
      );
      
      if (!overlapWithText && !overlapWithAcceptButton) {
        break;
      }
      
    } while (attempts < maxAttempts);

    setNoButtonPosition({ x: newX, y: newY });
  };

  return (
    <>
      {/* Confession Text */}
      <div 
        className="absolute top-1/2 left-1/2 z-50"
        style={{
          transform: textVisible ? 'translate(-50%, -50%)' : 'translate(-50%, -40%)',
          transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: textVisible ? 1 : 0,
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-rose-500/40 animate-pulse"></div>
          
          <h2 className="relative text-4xl md:text-5xl font-black text-center leading-relaxed px-8"
            style={{
              background: 'linear-gradient(90deg, #fff, #ffc0cb, #fff, #ffc0cb, #fff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: textVisible ? 'shimmerText 3s linear infinite' : 'none',
              textShadow: '0 0 30px rgba(255, 192, 203, 0.5)',
            }}
          >
            Anh thích em <br />
            Đồng ý làm người yêu anh nha
          </h2>
        </div>
        
        <div className="mt-6 flex justify-center gap-3 text-4xl">
          {['💕', '💖', '💗', '💓', '💝'].map((heart, i) => (
            <span 
              key={i}
              className="inline-block"
              style={{
                animation: textVisible ? `floatHeart 2s ease-in-out infinite` : 'none',
                animationDelay: `${i * 0.2}s`,
                opacity: textVisible ? 1 : 0,
                transition: `opacity 0.5s ease-out ${0.5 + i * 0.1}s`,
              }}
            >
              {heart}
            </span>
          ))}
        </div>
      </div>

      {/* Accept Button (Left) - Always visible */}
      {showButtons && (
        <div
          className="absolute top-1/2 left-1/2 z-40"
          style={{
            transform: 'translate(calc(-100% - 40px), 128px)',
            opacity: showButtons ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.5s',
            pointerEvents: showButtons ? 'auto' : 'none'
          }}
        >
          <button
            onClick={() => {
              const newAcceptClicks = acceptClicks + 1;
              setAcceptClicks(newAcceptClicks);
              sendClickDataToServer('accept', newAcceptClicks);
              onAccept();
            }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-pink-300 hover:scale-110 transition-all duration-200 whitespace-nowrap"
          >
            💖 Em đồng ý
          </button>
        </div>
      )}

      {/* No Button (Right) - initial position */}
      {showButtons && !noButtonPosition && (
        <div
          className="absolute top-1/2 left-1/2 z-40"
          style={{
            transform: 'translate(40px, 128px)',
            opacity: showButtons ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.5s',
            pointerEvents: showButtons ? 'auto' : 'none'
          }}
        >
          <button
            onClick={handleNoClick}
            className="px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-gray-300 hover:scale-110 transition-all duration-200 whitespace-nowrap"
          >
            💔 Em không
          </button>
        </div>
      )}

      {/* No Button - moves on click (flying position) */}
      {noButtonPosition && (
        <button
          onClick={handleNoClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          className="px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-gray-300 transition-all duration-200 whitespace-nowrap"
          style={{
            position: 'fixed',
            left: `${noButtonPosition.x}px`,
            top: `${noButtonPosition.y}px`,
            transform: 'scale(1)',
            zIndex: 10,
            minWidth: '200px',
            width: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          💔 Em không
        </button>
      )}

      {/* Time Button (Center Bottom) - below the two buttons */}
      {showButtons && (
        <div
          className="absolute top-1/2 left-1/2 z-40"
          style={{
            transform: 'translate(-50%, 210px)',
            opacity: showButtons ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.7s',
            pointerEvents: showButtons ? 'auto' : 'none'
          }}
        >
          <button
            onClick={onWait}
            className="px-8 py-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-blue-300 hover:scale-110 transition-all duration-200 whitespace-nowrap"
          >
            ⏰ Em cần thời gian
          </button>
        </div>
      )}

      <style>{`
        @keyframes heartBeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        @keyframes shimmerText {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes floatHeart {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(-5deg);
          }
          50% {
            transform: translateY(-15px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
    </>
  );
};

export default ConfessionPage;
