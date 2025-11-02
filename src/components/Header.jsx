import { useEffect, useRef, useState } from "react";
import { Menu, Bell, User, Sun, Moon, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function Header({ theme = "light", onToggleSidebar }) {
  const { darkMode, toggleTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scroll when mobile dropdown is open
  useEffect(() => {
    if (userMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [userMenuOpen]);

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
        {/* Theme Toggle */}
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

        {/* Notifications */}
        <button className="p-2 rounded-md hover:bg-primary/10 transition">
          <Bell className="w-5 h-5 text-primary" />
        </button>

        {/* User Dropdown */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="p-2 rounded-md hover:bg-primary/10 transition"
          >
            <User className="w-5 h-5 text-primary" />
          </button>

          {userMenuOpen && (
            <>
              {/* Mobile Overlay */}
              <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setUserMenuOpen(false)}
              />

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-bg border border-primary rounded-md shadow-lg z-50">
                <button className="w-full px-4 py-2 hover:bg-primary/10 text-left">
                  Profile
                </button>
                <button className="w-full px-4 py-2 hover:bg-primary/10 text-left">
                  Settings
                </button>
                <button className="w-full px-4 py-2 hover:bg-primary/10 text-left">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        {/* Sidebar Toggle (Mobile) */}
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
