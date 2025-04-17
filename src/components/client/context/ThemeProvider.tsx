'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { globalConfig, IColorOption } from '@9ll-fun/config';

type Theme = 'dark' | 'light' | 'system';

type IColor = Omit<IColorOption, 'default'>;

interface IThemeContext {
  selectedTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  selectedColor: IColor;
  setColor: (color: IColor) => void;
}

const LOCAL_STORAGE_KEYS = {
  THEME: 'selectedTheme',
  COLOR: 'selectedColor',
} as const;

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const getDefaultColor = (colorOptions: IColorOption[]): IColor => {
  const defaultColor = colorOptions.find((option) => option.default);
  return (defaultColor || colorOptions[0]) as IColor;
};

const getSystemTheme = (): Theme => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme: Theme): void => {
  const hoursDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
  const themeToApply = theme === 'system' ? (hoursDay ? 'light' : 'dark') : theme;

  document.documentElement.classList.toggle('dark', themeToApply === 'dark');
};

const applyColor = (color: IColor): void => {
  document.documentElement.style.setProperty('--color-layout', color.hex);
};

const getNextTheme = (currentTheme: Theme): Theme => {
  const themeSequence: Theme[] = ['light', 'dark', 'system'];
  const currentIndex = themeSequence.indexOf(currentTheme);
  return themeSequence[(currentIndex + 1) % themeSequence.length] as Theme;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('dark');
  const [selectedColor, setSelectedColor] = useState<IColor | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const systemTheme = getSystemTheme();
    const defaultColor = getDefaultColor(globalConfig.colorOptions);
    try {
      const storedColor = localStorage.getItem(LOCAL_STORAGE_KEYS.COLOR);
      const storedColorParsed = JSON.parse(`${storedColor}`) as IColor;
      setSelectedColor(storedColor ? storedColorParsed : defaultColor);

      const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as Theme | null;
      setSelectedTheme(storedTheme || systemTheme);

      setIsInitialized(true);
    } catch (_error) {
      setSelectedColor(defaultColor);
      setSelectedTheme(systemTheme);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (selectedColor) {
      applyColor(selectedColor);
      localStorage.setItem(LOCAL_STORAGE_KEYS.COLOR, JSON.stringify(selectedColor));
    }
  }, [selectedColor]);

  useEffect(() => {
    if (isInitialized) {
      applyTheme(selectedTheme);
    }
  }, [selectedTheme, isInitialized]);

  const toggleTheme = () => {
    const theme = getNextTheme(selectedTheme);
    setSelectedTheme(theme);
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
  };

  const setTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
  };

  const setColor = (color: IColor) => {
    setSelectedColor(color);
  };

  const currentColor = selectedColor || getDefaultColor(globalConfig.colorOptions);

  return (
    <ThemeContext.Provider
      value={{
        selectedTheme,
        toggleTheme,
        setTheme,
        selectedColor: currentColor,
        setColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
