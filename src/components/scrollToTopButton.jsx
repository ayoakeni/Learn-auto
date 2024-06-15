import React, { useState, useEffect, useCallback } from 'react';
import { useSound } from '../components/soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/jetTakeOff.MP3'; // Import your sound effect file
import '../assets/css/scrollToTopButton.css';

const ScrollToTopButton = ({ targetRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (targetRef.current.scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [targetRef]);

  useEffect(() => {
    const targetElement = targetRef.current;
    targetElement.addEventListener('scroll', toggleVisibility);
    return () => {
      targetElement.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility, targetRef]);

  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext
  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  const scrollToTop = () => {
    targetRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    playSoundEffect(); // Play sound effect when clicking ScrollTo
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-button">
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;