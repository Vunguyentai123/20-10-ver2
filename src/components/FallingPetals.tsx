const FallingPetals = () => {
  const flowers = ['🌸', '🌺', '🌷', '💐', '🌹', '💮', '🏵️'];
  const numberOfFlowers = 60;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(numberOfFlowers)].map((_, i) => {
        const column = (i / numberOfFlowers) * 100;
        const randomOffset = (Math.random() - 0.5) * 30;
        
        return (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.min(95, Math.max(5, column + randomOffset))}%`,
              top: `-20px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            <div 
              className="opacity-70"
              style={{
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              {flowers[Math.floor(Math.random() * flowers.length)]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FallingPetals;
