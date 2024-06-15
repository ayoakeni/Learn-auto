import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './auth'; 
import Popup from '../components/popup';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isSplashActive, setIsSplashActive] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && !isSplashActive) {
        setMessage('Logged in successfully!');
      }
    });

    return () => unsubscribe();
  }, [isSplashActive]);

  const clearMessage = () => {
    setMessage('');
  };

  return (
    <AuthContext.Provider value={{ currentUser, setMessage, setIsSplashActive }}>
      {children}
      {message && !isSplashActive && <Popup message={message} onDismiss={clearMessage} />}
    </AuthContext.Provider>
  );
};