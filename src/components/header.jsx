import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';
import useFontSize from '../components/useFontSize';
import { useSound } from '../components/soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/navigation.mp3'; // Import your sound effect file
import '../assets/css/header.css'
function Header() {
  const { currentUser } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const goToUser = () => {
    navigate('/user');
    playSoundEffect(); // Play sound effect when Navigating
  };

  const [fontSize] = useFontSize();

  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext
  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  return (
    <div className={`header font-size-${fontSize}`}>
      <i className="logo fa-solid fa-user-graduate"></i>
      <div onClick={goToUser} className="user" title='user'>
        <i class="fa-solid fa-user"></i>
        <h4>{currentUser.email}</h4>
      </div>
    </div>
  );
}

export default Header;
