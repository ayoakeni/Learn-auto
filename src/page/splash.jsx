import React, { useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../utils/authContext';
import { useSound } from '../components/soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/welcome.MP3'; // Import your sound effect file
import '../assets/css/splash.css';

const Splash = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { setIsSplashActive } = useContext(AuthContext); // Get setIsSplashActive from context

  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext

  const playSoundEffect = useCallback(() => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  }, [soundEffect]);

  useEffect(() => {
    setIsSplashActive(true); // Set splash active on mount

    const timer = setTimeout(() => {
      const onboardingComplete = localStorage.getItem('onboardingComplete');

      if (!onboardingComplete) {
        navigate('/onboarding');
      } else {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            navigate('/home');
            playSoundEffect(); // Play sound effect when navigating to home
          } else {
            navigate('/login');
          }
          setIsSplashActive(false); // Set splash inactive after navigation
        });
      }
    }, 7000); // 7 seconds delay for splash screen

    return () => {
      clearTimeout(timer); // Cleanup the timer if the component unmounts
      setIsSplashActive(false); // Ensure splash is set to inactive if component unmounts
    };
  }, [auth, navigate, setIsSplashActive, playSoundEffect]);

  return (
    <div className="splash-screen">
      <div className="con">
        <h1>Learn Auto</h1>
        <i className="fa-solid fa-user-graduate"></i>
      </div>
    </div>
  );
};

export default Splash;