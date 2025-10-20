import { useState, useEffect } from 'react';
import FallingPetals from './components/FallingPetals';
import HeartButton from './components/HeartButton';
import LetterPage from './components/LetterPage';
import GreetingContent from './components/GreetingContent';
import ConfessionPage from './components/ConfessionPage';
import SuccessPage from './components/SuccessPage';
import WaitingPage from './components/WaitingPage';
import { animationStyles } from './styles/animations';

type PageType = 'heart' | 'letter' | 'greeting' | 'confession' | 'success' | 'waiting';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('heart');

  // Function to navigate with history support
  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.history.pushState({ page }, '', `#${page}`);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        // If no state, check hash
        const hash = window.location.hash.slice(1) as PageType;
        if (hash) {
          setCurrentPage(hash);
        } else {
          setCurrentPage('heart');
        }
      }
    };

    // Set initial state
    window.history.replaceState({ page: currentPage }, '', `#${currentPage}`);

    // Listen to popstate event (back/forward buttons)
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center overflow-x-hidden relative">
      <FallingPetals />

      <div className="relative z-10 text-center px-4 py-8 w-full max-w-4xl min-h-screen flex items-center justify-center">
        <div className="w-full">
          {currentPage === 'heart' && (
            <HeartButton onClick={() => navigateTo('letter')} />
          )}
          
          {currentPage === 'letter' && (
            <LetterPage onReadLetter={() => navigateTo('greeting')} />
          )}
          
          {currentPage === 'greeting' && (
            <GreetingContent onLetterClick={() => navigateTo('confession')} />
          )}
          
          {currentPage === 'confession' && (
            <ConfessionPage 
              onAccept={() => navigateTo('success')}
              onWait={() => navigateTo('waiting')}
            />
          )}
          
          {currentPage === 'success' && (
            <SuccessPage />
          )}
          
          {currentPage === 'waiting' && (
            <WaitingPage />
          )}
        </div>
      </div>

      <style>{animationStyles}</style>
    </div>
  );
}

export default App;
