import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout as firebaseLogout } from '../utils/auth';
import { AuthContext } from '../utils/authContext';
import { useSound } from '../components/soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/annoyed-goodbye.MP3'; // Import your sound effect file
import '../assets/css/logout.css';

const Logout = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      setMessage('User logged out');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    playSoundEffect(); // Play sound effect when logged out
  };

  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext
  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  return (
    <i onClick={handleLogout} class="fa-solid fa-right-from-bracket" title='logout'></i>
  );
};

export default Logout;