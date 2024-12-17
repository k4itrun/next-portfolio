"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { globalConfig, ColorOption } from '@k4itrun/config';

type Theme = 'dark' | 'light' | 'system';

interface Color {
  name: string;
  hex: string;
}

interface ThemeContext {
  selectedTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme | any) => void;
  selectedColor: Color;
  setColor: (color: Color | any) => void;
}

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const useTheme = (): ThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function getDefaultColor(colorOptions: ColorOption[]): ColorOption | any {
  return colorOptions.find(option => option.default) || colorOptions[0];
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('dark');
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedColor = localStorage.getItem("selectedColor");
    if (storedColor) {
      setSelectedColor(JSON.parse(storedColor));
    } else {
      setSelectedColor(getDefaultColor(globalConfig.colorOptions));
    }

    const storedTheme = localStorage.getItem("selectedTheme") as Theme | null;
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setSelectedTheme(systemTheme);
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (selectedColor) {
      document.documentElement.style.setProperty('--color-layout', selectedColor.hex);
      localStorage.setItem("selectedColor", JSON.stringify(selectedColor));
    }
  }, [selectedColor]);

  useEffect(() => {
    if (isInitialized) {
      const themeToApply = selectedTheme === 'system'
        ? (new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'light' : 'dark')
        : selectedTheme;

      document.documentElement.classList.toggle("dark", themeToApply === 'dark');
    }
  }, [selectedTheme, isInitialized]);

  const toggleTheme = () => {
    const nextTheme: Theme = selectedTheme === "light" ? "dark" : selectedTheme === "dark" ? "system" : "light";
    setSelectedTheme(nextTheme);
    localStorage.setItem("selectedTheme", nextTheme);
  };

  const setTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("selectedTheme", theme);
  };

  const setColor = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <ThemeContext.Provider value={{
      selectedTheme,
      toggleTheme,
      setTheme,
      selectedColor: selectedColor || getDefaultColor(globalConfig.colorOptions),
      setColor,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
