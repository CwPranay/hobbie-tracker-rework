import { useState } from 'react';
import { X } from 'lucide-react';
import axios from '../api/axios';

const SessionModal = ({ hobbyId, onClose }) => {
  const [formData, setFormData] = useState({
    duration: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.duration || formData.duration <= 0) {
      setError('Duration must be greater than 0');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`/sessions/${hobbyId}`, {
        ...formData,
        duration: parseInt(formData.duration),
      });
      onClose(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-[#E2E8F0] rounded-lg max-w-md w-full shadow-[0_8px_0_0_rgba(11,31,59,0.15)]">
        <div className="flex justify-between items-center p-6 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#0B1F3B]">Add Practice Session</h2>
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
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-transparent bg-white text-[#0B1F3B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B1F3B] mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              min="1"
              className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-transparent bg-white text-[#0B1F3B] placeholder-[#94A3B8]"
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B1F3B] mb-2">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="3"
              className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] focus:border-transparent bg-white text-[#0B1F3B] placeholder-[#94A3B8] resize-none"
              placeholder="What did you practice today?"
            />
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
              {loading ? 'Adding...' : 'Add Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
