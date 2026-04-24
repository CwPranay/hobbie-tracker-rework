import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import axios from '../api/axios';

const UserSearchModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`/users/search?q=${searchQuery}`);
      setUsers(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Find Users</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 bg-[#0B1F3B] text-white text-sm font-semibold rounded-lg hover:bg-[#0A1A2F] transition-colors disabled:opacity-50"
              >
                {loading ? '...' : 'Search'}
              </button>
            </div>
          </form>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {users.length === 0 ? (
              <p className="text-center text-gray-500 py-8 text-sm">
                {searchQuery ? 'No users found' : 'Search for users to connect'}
              </p>
            ) : (
              users.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleUserClick(user._id)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0B1F3B] flex items-center justify-center text-white font-medium flex-shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchModal;
