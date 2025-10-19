import { useState, useEffect } from 'react';

interface ConfessionPageProps {
  onAccept: () => void;
}

const ConfessionPage = ({ onAccept }: ConfessionPageProps) => {
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
          transform: 'translate(-50%, -50%)',
          transition: 'all 1s ease-out',
          opacity: textVisible ? 1 : 0,
          scale: textVisible ? 1 : 0.8,
        }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-center text-white drop-shadow-2xl leading-relaxed px-8">
          Anh thích em <br />
          Đồng ý làm người yêu anh nha
        </h2>
        <div className="mt-6 flex justify-center gap-3 text-4xl">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>💕</span>
          <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>💖</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💗</span>
          <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>💓</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💝</span>
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
            ✅ Em đồng ý
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
            ❌ Em không đồng ý
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
          ❌ Em không đồng ý
        </button>
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
      `}</style>
    </>
  );
};

export default ConfessionPage;
