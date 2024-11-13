import { Theme, Color, ThemeContextType, ThemeProviderProps } from '@/interfaces';

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('dark');
  const [selectedColor, setSelectedColor] = useState<Color>({ name: "Green", hex: "#00FF00" });
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme") as Theme | null;
    const storedColor = localStorage.getItem("selectedColor");

    if (storedTheme) {
      setSelectedTheme(storedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setSelectedTheme(systemTheme);
    }

    if (storedColor) {
      setSelectedColor(JSON.parse(storedColor));
    }

    setIsInitialized(true);
  }, []);

  const changeColor = (newColor: Color) => {
    setSelectedColor(newColor);
    localStorage.setItem("selectedColor", JSON.stringify(newColor));
    document.documentElement.style.setProperty('--color-layout', newColor.hex);
  };

  const changeTheme = (newTheme: Theme) => {
    setSelectedTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
  };

  useEffect(() => {
    if (selectedColor) {
      document.documentElement.style.setProperty('--color-layout', selectedColor.hex);
    }
  }, [selectedColor]);

  const getDayOrNightTheme = (): Theme => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? 'light' : 'dark';
  };

  useEffect(() => {
    if (isInitialized) {
      if (selectedTheme === 'system') {
        const systemTheme = getDayOrNightTheme();
        document.documentElement.classList.toggle("dark", systemTheme === "dark");
      } else {
        document.documentElement.classList.toggle("dark", selectedTheme === "dark");
      }
    }
  }, [selectedTheme, isInitialized]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (selectedTheme === 'system') {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        document.documentElement.classList.toggle("dark", systemTheme === "dark");
      }
    };

    if (selectedTheme === 'system') {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [selectedTheme]);

  const toggleTheme = () => {
    const newTheme: Theme = selectedTheme === "light" ? "dark" : selectedTheme === "dark" ? "system" : "light";
    setSelectedTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
  };

  return (
    <>
      <ThemeContext.Provider value={{
        selectedTheme: selectedTheme,
        toggleTheme: toggleTheme,
        setTheme: changeTheme,
        selectedColor: selectedColor,
        setColor: changeColor,
      }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
