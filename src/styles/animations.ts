export const animationStyles = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  @keyframes shimmer {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
  @keyframes float-slow {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-30px) rotate(10deg);
    }
  }
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-fall {
    animation: fall linear infinite;
  }
  .animate-fadeInScale {
    animation: fadeInScale 0.8s ease-out;
  }
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
  .animate-shimmer {
    background-size: 200% auto;
    animation: shimmer 2s linear infinite;
  }
  .animate-float-slow {
    animation: float-slow 5s ease-in-out infinite;
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  @keyframes expandWidth {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  @keyframes revealText {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
`;
