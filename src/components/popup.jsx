import React, { useEffect } from 'react';
import '../assets/css/popup.css';

const Popup = ({ message, duration = 3000, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [duration, onDismiss]);

  return (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
};

export default Popup;