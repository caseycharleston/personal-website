'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  AccentId,
  DEFAULT_ACCENT,
  STORAGE_ACCENT,
  STORAGE_THEME,
} from '@/lib/accents';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  accent: AccentId;
  toggleTheme: () => void;
  setAccent: (a: AccentId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [accent, setAccentState] = useState<AccentId>(DEFAULT_ACCENT);

  // Hydrate from what the inline script already applied to <html>.
  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    const a = root.getAttribute('data-accent') as AccentId | null;
    if (a) setAccentState(a);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      root.classList.toggle('dark', next === 'dark');
      localStorage.setItem(STORAGE_THEME, next);
      return next;
    });
  };

  const setAccent = (a: AccentId) => {
    setAccentState(a);
    document.documentElement.setAttribute('data-accent', a);
    localStorage.setItem(STORAGE_ACCENT, a);
  };

  return (
    <ThemeContext.Provider value={{ theme, accent, toggleTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
