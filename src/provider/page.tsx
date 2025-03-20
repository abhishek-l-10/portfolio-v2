import React, { createContext, useContext, useState, useEffect } from "react";

// Define the theme context type
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create a context for theme with proper typing
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme Provider component
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if there's a saved theme preference in localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "dark"; // Default to dark theme
    }
    return "dark";
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  // Apply theme class to document body
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light-theme", "dark-theme");
    root.classList.add(`${theme}-theme`);
  }, [theme]);

  // Provide theme context to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
