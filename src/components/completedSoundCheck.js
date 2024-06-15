import { useSound } from './soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/complete.mp3'; // Import your sound effect file

const CompleteSound = () => {
  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext

  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  return playSoundEffect; // Return the function itself
};

export default CompleteSound;