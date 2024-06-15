import React, { useState, useEffect } from 'react';
import '../assets/css/connectionStatus.css';

function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {showMessage && (
        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? 'Internet Restored..' : 'No Internet Connection..'}
        </div>
      )}
    </div>
  );
}

export default ConnectionStatus