import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus, Search, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import UserSearchModal from './UserSearchModal';
import HobbyModal from './HobbyModal';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showHobbyModal, setShowHobbyModal] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    console.log('Logout button clicked');
    setShowUserMenu(false);
    
    // Perform logout
    logout();
    
    // Navigate to login
    navigate('/login', { replace: true });
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/sessions', label: 'Sessions' },
    { path: '/feed', label: 'Feed' },
    { path: '/profile', label: 'Profile' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleAddHabit = () => {
    setShowHobbyModal(true);
  };

  const handleHobbyModalClose = (refresh) => {
    setShowHobbyModal(false);
    if (refresh) {
      // Refresh the current page by triggering a navigation
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
      {/* Top Navigation - Fixed/Sticky */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E2E8F0] bg-white shadow-[0_2px_0_0_rgba(11,31,59,0.08)]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img 
                src="/logo-removebg-preview.png" 
                alt="HobbyTrack" 
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-[#0B1F3B]">Hobby Tracker</span>
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-[#0B1F3B]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Add Habit CTA - Always visible */}
              <button
                onClick={handleAddHabit}
                type="button"
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[#0B1F3B] text-white text-sm font-semibold rounded-lg hover:bg-[#0A1A2F] transition-colors"
              >
                <Plus size={16} />
                <span>Add Habit</span>
              </button>

              {/* Search Button */}
              <button
                onClick={() => setShowSearchModal(true)}
                type="button"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Search users"
              >
                <Search size={18} />
              </button>

              {/* User Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => {
                    console.log('User menu toggled:', !showUserMenu);
                    setShowUserMenu(!showUserMenu);
                  }}
                  type="button"
                  className="flex items-center space-x-2.5 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                  <span className="hidden md:block">{user?.name}</span>
                  <div className="w-8 h-8 rounded-lg bg-[#0B1F3B] flex items-center justify-center text-white text-xs font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-lg py-1 shadow-[0_4px_0_0_rgba(11,31,59,0.1)]">
                    <div className="px-4 py-3 border-b border-[#E2E8F0]">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-[#64748B] truncate mt-0.5">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-[#475569] hover:bg-[#F8FAFC] transition-colors text-left cursor-pointer"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Add padding top to account for fixed navbar */}
      <main className="relative z-10 pt-16">
        {children}
      </main>

      {/* Search Modal */}
      {showSearchModal && (
        <UserSearchModal onClose={() => setShowSearchModal(false)} />
      )}

      {/* Hobby Modal */}
      {showHobbyModal && (
        <HobbyModal onClose={handleHobbyModalClose} />
      )}
    </div>
  );
};

export default Layout;
