import React, { createContext, useContext, useState, useEffect } from 'react';
import clickSound from '../assets/soundEffects/pick.MP3';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [soundEffect, setSoundEffect] = useState(() => {
    // Retrieve sound effect state from local storage
    const savedSoundEffect = localStorage.getItem('soundEffect');
    return savedSoundEffect !== null ? JSON.parse(savedSoundEffect) : true;
  });

  useEffect(() => {
    // Save sound effect state to local storage whenever it changes
    localStorage.setItem('soundEffect', JSON.stringify(soundEffect));
  }, [soundEffect]);

  const toggleSoundEffect = () => {
    setSoundEffect(prevState => !prevState);
  };

  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  return (
    <SoundContext.Provider value={{ soundEffect, toggleSoundEffect, playSoundEffect }}>
      {children}
    </SoundContext.Provider>
  );
};