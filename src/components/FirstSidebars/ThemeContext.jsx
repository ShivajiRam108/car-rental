import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let isDark = false;
    if (savedTheme !== null) {
      isDark = JSON.parse(savedTheme);
    } else {
      isDark = systemPrefersDark;
    }
    
    setDarkMode(isDark);
    applyTheme(isDark);
    
    // Debug log
    console.log('Theme initialized:', isDark ? 'dark' : 'light');
  }, []);

  // This function MUST add/remove the 'dark' class
  const applyTheme = (isDark) => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    if (isDark) {
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark');
      console.log('Applied dark theme'); // Debug
    } else {
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark');
      console.log('Applied light theme'); // Debug
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    console.log('Toggling theme to:', newDarkMode ? 'dark' : 'light'); // Debug
    
    setDarkMode(newDarkMode);
    applyTheme(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;