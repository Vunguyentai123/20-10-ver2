import { useEffect, useState } from 'react';

interface GreetingContentProps {
  onLetterClick: () => void;
}

const GreetingContent = ({ onLetterClick }: GreetingContentProps) => {
  const [visibleLines, setVisibleLines] = useState(0);

  const greetingLines = [
    { text: 'Chúc Ánh Dương', isFirst: true, delay: 0, charCount: 13 },
    { text: 'Luôn xinh đẹp rạng rỡ như hoa tươi', delay: 1500, charCount: 35 },
    { text: 'Mãi trẻ trung, duyên dáng qua năm tháng', delay: 3500, charCount: 39 },
    { text: 'Tràn đầy hạnh phúc, yêu thương bên gia đình', delay: 5500, charCount: 44 },
    { text: 'Luôn thành công, tỏa sáng trên con đường mình đã chọn', delay: 7500, charCount: 55 },
  ];

  useEffect(() => {
    greetingLines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, greetingLines[index].delay);
    });
  }, []);

  return (
    <div className="flex items-center justify-center gap-12 px-4 w-full max-w-7xl h-screen">
      <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0 w-64 h-screen">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-purple-400/30 blur-3xl animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-10 border-4 border-white/30 shadow-2xl flex items-center justify-center">
            <div className="text-8xl animate-float-slow">🌸</div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-spin-slow" style={{ animationDuration: '20s' }}>🌺</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-5xl animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>🌷</div>
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-spin-slow" style={{ animationDuration: '25s' }}>🌹</div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-5xl animate-spin-slow" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>💐</div>
          </div>
          <div className="absolute -top-8 -right-8 text-4xl animate-bounce">💕</div>
          <div className="absolute -bottom-8 -left-8 text-4xl animate-bounce" style={{ animationDelay: '0.3s' }}>💝</div>
        </div>
        <div className="mt-8 text-6xl font-black text-white/80 drop-shadow-lg animate-pulse">20/10</div>
        <div className="text-2xl text-white/70 font-semibold mt-3">🦋 ✨ 🦋</div>
      </div>
      <div className="flex-1 max-w-3xl flex flex-col justify-center space-y-3">
        <div className="mb-4 flex items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-2xl">Ngày Phụ Nữ Việt Nam</h1>
          <button 
            onClick={onLetterClick}
            className="relative cursor-pointer hover:scale-110 transition-transform duration-300"
            aria-label="Đọc tin nhắn mới"
          >
            <svg 
              className="w-10 h-10 text-white drop-shadow-lg animate-bounce" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              style={{ animationDuration: '2s' }}
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white animate-pulse">
              1
            </span>
          </button>
        </div>
        <div className="space-y-3">
          {greetingLines.map((line, index) => (
            <div 
              key={index} 
              className={`${
                visibleLines > index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: visibleLines > index ? 'translateX(0)' : 'translateX(-80px)',
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
              }}
            >
              {line.isFirst ? (
                <div className="text-lg md:text-xl font-bold text-white drop-shadow-lg leading-relaxed whitespace-nowrap relative">
                  {visibleLines > index ? (
                    <>
                      <span>Chúc </span>
                      <span 
                        className="text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text inline-block"
                        style={{
                          animation: `revealText 1.3s steps(${line.charCount}) forwards`,
                        }}
                      >
                        Ánh Dương
                      </span>
                    </>
                  ) : (
                    <>
                      Chúc <span className="text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text">Ánh Dương</span>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-lg md:text-xl font-bold text-white drop-shadow-lg leading-relaxed whitespace-nowrap">
                  {visibleLines > index ? (
                    <span 
                      style={{
                        animation: `revealText 1.8s steps(${line.charCount}) forwards`,
                      }}
                    >
                      {line.text}
                    </span>
                  ) : (
                    line.text
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {visibleLines >= greetingLines.length && (
          <div className="mt-4 transform transition-all duration-1000 opacity-0 translate-y-10 text-center" style={{ animation: 'fadeInUp 1s ease-out 0.5s forwards' }}>
            <p className="text-base md:text-lg italic text-white/90 font-light leading-relaxed">
              <span className="text-2xl text-pink-300">&quot;</span>
              Phụ nữ là những đóa hoa đẹp nhất của cuộc đời
              <span className="text-2xl text-pink-300">&quot;</span>
            </p>
            <div className="flex justify-center gap-2 mt-3 text-3xl">
              {['🌸', '🌺', '🌷', '🌹', '💐', '💕', '💝'].map((emoji, i) => (
                <span key={i} className="inline-block animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{emoji}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreetingContent;
