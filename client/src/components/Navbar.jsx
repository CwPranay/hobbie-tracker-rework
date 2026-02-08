import React, { useState, useEffect } from "react";

const Navbar = ({ user, onLogout }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="text-2xl font-extrabold tracking-tight select-none text-gray-900 dark:text-white font-sans">
        <span className="text-blue-600 dark:text-blue-400">Hobbie</span>Tracker
      </div>
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDarkMode((d) => !d)}
          className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow transition-colors"
        >
          {darkMode ? (
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          )}
        </button>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-700 dark:text-gray-200 font-medium text-base">{user.name}</span>
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-blue-400 dark:border-blue-600 shadow"
            />
            <button
              onClick={onLogout}
              className="ml-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-semibold shadow"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Login</a>
            <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Register</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
