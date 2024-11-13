import { ReactNode } from "react";

export type Theme = 'dark' | 'light' | 'system';

export type Color = {
  name: string;
  hex: string;
};

export interface ThemeContextType {
  selectedTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  selectedColor: Color;
  setColor: (color: Color) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
