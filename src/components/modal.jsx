import React, { useRef, useState } from 'react';
import useFontSize from '../components/useFontSize';
import { useSound } from '../components/soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/level-complete.mp3'; // Import your sound effect file
import '../assets/css/modal.css';
import ScrollToTopButton from './scrollToTopButton';

const Modal = ({
  show,
  onClose,
  children,
  onNext,
  onPrevious,
  showNext,
  showPrevious,
  onDone,
  showDone,
  showCompletionMessage,
  isTest,
}) => {
  const contentRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fontSize] = useFontSize();

  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext
  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  if (!show) {
    return null;
  }

  const handleCloseClick = () => {
    if (isTest) {
      setShowConfirmation(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmation(false);
  };

  const handleDoneClick = () => {
    playSoundEffect();
    onDone();
  };

  return (
    <div className={`modal-overlay font-size-${fontSize}`}>
      <div ref={contentRef} className="modal-content">
        <i onClick={handleCloseClick} className="modal-close fa-solid fa-xmark"></i>
        {children}
        {!showCompletionMessage && !isTest && (
          <div className="navigation">
            {showPrevious && <button onClick={onPrevious}>Previous</button>}
            {showNext && <button onClick={onNext}>Next</button>}
            {showDone && <button onClick={handleDoneClick}>Done</button>}
          </div>
        )}
        <ScrollToTopButton targetRef={contentRef} />
      </div>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>
              Are you sure you want to quit?<br />
              <span>You will lose your progress.</span>
            </p>
            <button onClick={handleConfirmClose}>Yes</button>
            <button onClick={handleCancelClose}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;