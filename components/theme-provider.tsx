"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Get theme from environment variable, default to dark
    const envTheme = process.env.NEXT_PUBLIC_THEME_MODE as Theme;
    const initialTheme = envTheme === "light" ? "light" : "dark";
    
    setTheme(initialTheme);
    
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(initialTheme);
  }, []);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};