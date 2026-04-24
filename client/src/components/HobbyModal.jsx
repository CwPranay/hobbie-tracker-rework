import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from '../api/axios';

const HobbyModal = ({ hobby, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    level: 'Beginner',
    isPublic: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (hobby) {
      setFormData({
        title: hobby.title,
        level: hobby.level,
        isPublic: hobby.isPublic,
      });
    }
  }, [hobby]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    try {
      if (hobby) {
        await axios.put(`/hobbies/${hobby._id}`, formData);
      } else {
        await axios.post('/hobbies', formData);
      }
      onClose(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save habit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-[#E2E8F0] rounded-lg max-w-md w-full shadow-[0_8px_0_0_rgba(11,31,59,0.15)]">
        <div className="flex justify-between items-center p-6 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#0B1F3B]">
            {hobby ? 'Edit Habit' : 'Add New Habit'}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-[#94A3B8] hover:text-[#0B1F3B] p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#0B1F3B] mb-2">
              Habit Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-transparent bg-white text-[#0B1F3B] placeholder-[#94A3B8]"
              placeholder="e.g., Guitar, Running, Painting"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B1F3B] mb-2">
              Skill Level
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-transparent bg-white text-[#0B1F3B]"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              className="w-4 h-4 text-[#0B1F3B] border-[#E2E8F0] rounded focus:ring-[#0B1F3B] bg-white"
            />
            <label htmlFor="isPublic" className="ml-2 text-sm text-[#475569]">
              Make this habit visible to others
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-[#475569] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#0B1F3B] text-white text-sm font-semibold rounded-lg hover:bg-[#0A1A2F] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : hobby ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HobbyModal;
