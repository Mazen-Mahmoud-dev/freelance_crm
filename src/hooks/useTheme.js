import { useState, useEffect } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", stored || "light");
    document.documentElement.setAttribute("class", stored || "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.setAttribute("class", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return { darkMode, toggleTheme };
}
