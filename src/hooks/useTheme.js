import { useState, useEffect } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", stored || "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return { darkMode, toggleTheme };
}
