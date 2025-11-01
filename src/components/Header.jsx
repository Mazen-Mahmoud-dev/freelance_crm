import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, Bell, User, Sun, Moon, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

gsap.registerPlugin(ScrollTrigger);

export default function Header({ theme = "light", onToggleSidebar }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      className={`
        flex items-center justify-between
        px-6 py-3 md:px-10 md:py-4
        sticky top-0 z-50
        bg-bg text-text transition-all duration-300
        border-b border-[var(--color-muted)]/20
        font-sans
        ${theme === "glass" ? "backdrop-blur-lg bg-white/30" : ""}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary">Freelance</span>
        <span className="text-muted font-medium">CRM</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-primary/10 transition"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </button>

        <button className="p-2 rounded-md hover:bg-primary/10 transition">
          <Bell className="w-5 h-5 text-primary" />
        </button>

        <button className="p-2 rounded-md hover:bg-primary/10 transition">
          <User className="w-5 h-5 text-primary" />
        </button>

        {/* 🟦 Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-primary/10 transition md:hidden"
          title="Toggle Sidebar"
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
      </div>
    </header>
  );
}
