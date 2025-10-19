import { useState } from 'react';
import FallingPetals from './components/FallingPetals';
import HeartButton from './components/HeartButton';
import LetterPage from './components/LetterPage';
import GreetingContent from './components/GreetingContent';
import ConfessionPage from './components/ConfessionPage';
import SuccessPage from './components/SuccessPage';
import { animationStyles } from './styles/animations';

function App() {
  const [currentPage, setCurrentPage] = useState<'heart' | 'letter' | 'greeting' | 'confession' | 'success'>('heart');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center overflow-hidden relative">
      {/* Falling petals background - all pages */}
      <FallingPetals />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl w-full">
        {currentPage === 'heart' && (
          <HeartButton onClick={() => setCurrentPage('letter')} />
        )}
        
        {currentPage === 'letter' && (
          <LetterPage onReadLetter={() => setCurrentPage('greeting')} />
        )}
        
        {currentPage === 'greeting' && (
          <GreetingContent onLetterClick={() => setCurrentPage('confession')} />
        )}
        
        {currentPage === 'confession' && (
          <ConfessionPage onAccept={() => setCurrentPage('success')} />
        )}
        
        {currentPage === 'success' && (
          <SuccessPage />
        )}
      </div>

      <style>{animationStyles}</style>
    </div>
  );
}

export default App;
