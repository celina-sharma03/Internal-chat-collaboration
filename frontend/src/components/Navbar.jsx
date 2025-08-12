import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";


const Navbar = ({ toggleDarkMode }) => {
  const { logout, authUser } = useAuthStore();const { theme, setTheme } = useThemeStore();
  const isDarkMode = theme === "dark";
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleToggleDark = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
  
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="w-full flex items-center justify-between px-4 md:px-8 lg:px-60 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            SyncSpace
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/settings" className="nav-btn">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <Link to="/profile" className="nav-btn">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
          <button onClick={logout} className="nav-btn">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
          <button onClick={handleToggleDark} className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800">
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <Link to="/settings" className="block py-2 text-gray-700 dark:text-gray-200">⚙️ Settings</Link>
          <Link to="/profile" className="block py-2 text-gray-700 dark:text-gray-200">👤 Profile</Link>
          <button onClick={logout} className="block py-2 text-gray-700 dark:text-gray-200 w-full text-left">🚪 Logout</button>
          <button onClick={handleToggleDark} className="block py-2 text-gray-700 dark:text-gray-200 w-full text-left">
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
