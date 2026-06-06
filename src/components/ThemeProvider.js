'use client';

import { createContext, useState, useEffect } from 'react';
import { DEFAULT_THEME } from '@/lib/themes';

export const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sukoon-theme') || DEFAULT_THEME;
    setThemeState(saved);
    document.documentElement.setAttribute('data-theme', saved);
    setMounted(true);
  }, []);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('sukoon-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
