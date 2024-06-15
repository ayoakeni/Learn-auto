import { useState, useEffect } from 'react';

function useFontSize() {
  const localStorageKey = 'font-size';
  const [fontSize, setFontSize] = useState(() => {
    const storedFontSize = localStorage.getItem(localStorageKey);
    return storedFontSize || 'medium'; // Default font size
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, fontSize);
  }, [fontSize]);

  const handleFontSizeChange = (event) => setFontSize(event.target.value);

  return [fontSize, handleFontSizeChange];
}

export default useFontSize;