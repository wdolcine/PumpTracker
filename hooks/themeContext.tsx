import { ColorPalette, Colors } from "@/constants/Colors";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  colors: ColorPalette;
  toggleDarkMode: (isDarkMode: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  colors: Colors.lightColor,
  toggleDarkMode: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const colors = isDarkMode ? Colors.darkColor : Colors.lightColor;

  const toggleDarkMode = (shouldEnable: boolean) => {
    setIsDarkMode(shouldEnable);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
