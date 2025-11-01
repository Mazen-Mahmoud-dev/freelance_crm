import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderGuest({ theme = "glass" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      !darkMode ? "dark" : "light"
    );
  };

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        flex items-center justify-between
        px-6 py-3 md:px-10 md:py-4
        font-sans transition-all duration-300
        ${theme === "glass"
          ? "backdrop-blur-[var(--blur-header)] bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(20,20,20,0.5)]"
          : "bg-[var(--color-bg)]"}
        shadow-[var(--shadow-header)]
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary">Freelance</span>
        <span className="text-muted">CRM</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8 text-[var(--color-text)] font-medium">
        {["Home", "Features", "Pricing", "Contact"].map((item) => (
          <Link
            key={item}
            to="/"
            className="hover:text-primary transition-colors duration-200"
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Dark Mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-primary/10 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </button>

        {/* Buttons */}
        <Link to="/auth?request=login">
          <button className="hidden md:inline-block text-[var(--color-text)] hover:text-primary font-medium transition">
            Login
          </button>
        </Link>
        <Link to="/auth?request=signup">
          <button className="hidden md:inline-block bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition">
            Get Started
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden p-2 rounded-md hover:bg-primary/10 transition"
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`absolute top-full left-0 w-full flex flex-col items-center gap-4 py-4
        bg-[var(--color-bg)] dark:bg-[rgba(20,20,20,0.95)]
        text-[var(--color-text)] shadow-lg md:hidden transition-all duration-300
        ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
      `}
      >
        {["Home", "Features", "Pricing", "Contact"].map((item) => (
          <Link
            key={item}
            to="/"
            className="hover:text-primary transition-colors duration-200"
            onClick={() => setMobileOpen(false)}
          >
            {item}
          </Link>
        ))}
        <Link to="/auth?request=login">
          <button className="text-[var(--color-text)] hover:text-primary font-medium transition">
            Login
          </button>
        </Link>
        <Link to="/auth?request=signup">
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition">
            Get Started
          </button>
        </Link>
      </div>
    </header>
  );
}
