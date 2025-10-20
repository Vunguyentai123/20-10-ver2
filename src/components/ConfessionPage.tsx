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

  // Hide body overflow when this component mounts
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const newNoClicks = noClicks + 1;
    setNoClicks(newNoClicks);
    sendClickDataToServer('no', newNoClicks);
    
    // Get ACTUAL button dimensions from the clicked button
    const clickedButton = e.currentTarget as HTMLButtonElement;
    const buttonRect = clickedButton.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    const margin = 40;
    
    // Get ACTUAL text position from DOM
    const textElement = document.querySelector('h2');
    let textLeft = 0;
    let textRight = 0;
    let textTop = 0;
    let textBottom = 0;
    
    if (textElement) {
      const textRect = textElement.getBoundingClientRect();
      textLeft = textRect.left - margin;
      textRight = textRect.right + margin;
      textTop = textRect.top - margin;
      textBottom = textRect.bottom + margin;
    }
    
    // Get ACTUAL Accept button position from DOM
    const acceptButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Em đồng ý') && btn !== clickedButton
    );
    let acceptButtonLeft = 0;
    let acceptButtonRight = 0;
    let acceptButtonTop = 0;
    let acceptButtonBottom = 0;
    let foundAcceptButton = false;
    
    if (acceptButton) {
      const rect = acceptButton.getBoundingClientRect();
      acceptButtonLeft = rect.left - margin;
      acceptButtonRight = rect.right + margin;
      acceptButtonTop = rect.top - margin;
      acceptButtonBottom = rect.bottom + margin;
      foundAcceptButton = true;
    }
    
    // Get ACTUAL Time button position from DOM
    const timeButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Em cần thời gian') && btn !== clickedButton
    );
    let timeButtonLeft = 0;
    let timeButtonRight = 0;
    let timeButtonTop = 0;
    let timeButtonBottom = 0;
    let foundTimeButton = false;
    
    if (timeButton) {
      const rect = timeButton.getBoundingClientRect();
      timeButtonLeft = rect.left - margin;
      timeButtonRight = rect.right + margin;
      timeButtonTop = rect.top - margin;
      timeButtonBottom = rect.bottom + margin;
      foundTimeButton = true;
    }
    
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
      
      // Check overlap with text
      const overlapWithText = textElement ? !(
        noButtonRight < textLeft ||
        noButtonLeft > textRight ||
        noButtonBottom < textTop ||
        noButtonTop > textBottom
      ) : false;
      
      // Check overlap with accept button
      const overlapWithAcceptButton = foundAcceptButton ? !(
        noButtonRight < acceptButtonLeft ||
        noButtonLeft > acceptButtonRight ||
        noButtonBottom < acceptButtonTop ||
        noButtonTop > acceptButtonBottom
      ) : false;
      
      // Check overlap with time button
      const overlapWithTimeButton = foundTimeButton ? !(
        noButtonRight < timeButtonLeft ||
        noButtonLeft > timeButtonRight ||
        noButtonBottom < timeButtonTop ||
        noButtonTop > timeButtonBottom
      ) : false;
      
      if (!overlapWithText && !overlapWithAcceptButton && !overlapWithTimeButton) {
        break;
      }
      
    } while (attempts < maxAttempts);

    setNoButtonPosition({ x: newX, y: newY });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Confession Text */}
      <div 
        className="relative z-50 px-4 w-full max-w-2xl"
        style={{
          transform: textVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: textVisible ? 1 : 0,
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-rose-500/40 animate-pulse"></div>
          
          <h2 className="relative text-2xl sm:text-3xl md:text-5xl font-black text-center leading-relaxed px-4 sm:px-8"
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
        
        <div className="mt-6 flex justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl">
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

        {/* Buttons Container - Now in relative flow below text */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-4">
          {/* Accept and Time buttons row */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
            {showButtons && (
              <button
                onClick={() => {
                  const newAcceptClicks = acceptClicks + 1;
                  setAcceptClicks(newAcceptClicks);
                  sendClickDataToServer('accept', newAcceptClicks);
                  onAccept();
                }}
                style={{
                  opacity: showButtons ? 1 : 0,
                  transition: 'opacity 0.5s ease-out 0.5s',
                  pointerEvents: showButtons ? 'auto' : 'none'
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:shadow-pink-300 hover:scale-110 transition-all duration-200 whitespace-nowrap"
              >
                💖 Em đồng ý
              </button>
            )}

            {showButtons && (
              <button
                onClick={onWait}
                style={{
                  opacity: showButtons ? 1 : 0,
                  transition: 'opacity 0.5s ease-out 0.7s',
                  pointerEvents: showButtons ? 'auto' : 'none'
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:shadow-blue-300 hover:scale-110 transition-all duration-200 whitespace-nowrap"
              >
                ⏰ Em cần thời gian
              </button>
            )}
          </div>

          {/* No Button - Second row */}
          {showButtons && !noButtonPosition && (
            <button
              onClick={handleNoClick}
              style={{
                opacity: showButtons ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.5s',
                pointerEvents: showButtons ? 'auto' : 'none'
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:shadow-gray-300 hover:scale-110 transition-all duration-200 whitespace-nowrap"
            >
              💔 Em không
            </button>
          )}
        </div>
      </div>

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
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:shadow-gray-300 transition-all duration-200 whitespace-nowrap"
          style={{
            position: 'fixed',
            left: `${noButtonPosition.x}px`,
            top: `${noButtonPosition.y}px`,
            transform: 'scale(1)',
            zIndex: 50,
            minWidth: '150px',
            width: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          💔 Em không
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
    </div>
  );
};

export default ConfessionPage;
