import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always use dark theme for our premium design
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Always add dark class
    root.classList.add('dark');
    
    // Save to localStorage
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Keep dark theme always (premium design requirement)
    setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
