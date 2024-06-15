import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSound } from '../components/soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/navigation.mp3'; // Import your sound effect file
import '../assets/css/sidebar.css';
import Logout from './logout';

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const handleNavigation = (path) => {
    setActive(path);
    navigate(path);
    playSoundEffect(); // Play sound effect when Navigating
  };

  
  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext
  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  // const refreshPage = () => {
  //   window.location.reload();
  // };

  return (
    <div className='sidebar'>
      <i
        onClick={() => handleNavigation('/home')}
        className={`fa-solid fa-house-chimney ${active === '/home' ? 'active' : ''}`}
        title='home'
      ></i>
      <i
        onClick={() => handleNavigation('/dashboard')}
        className={`fa-solid fa-graduation-cap ${active === '/dashboard' ? 'active' : ''}`}
        title='dashboard'
      ></i>
      <i
        onClick={() => handleNavigation('/user')}
        className={`fa-solid fa-user ${active === '/user' ? 'active' : ''}`}
        title='user'
      ></i>
      {/* <i onClick={refreshPage} className='fa-solid fa-rotate-left' title='refresh'></i> */}
      <i
        onClick={() => handleNavigation('/notification')}
        className={`fa-solid fa-bell ${active === '/notification' ? 'active' : ''}`}
        title='notification'
      ></i>
      <Logout />
    </div>
  );
}

export default SideBar;