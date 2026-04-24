import { Edit2, Trash2 } from 'lucide-react';

const HobbyCard = ({ hobby, onEdit, onDelete, onViewSessions }) => {
  return (
    <div className="relative bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-[0_4px_0_0_rgba(11,31,59,0.1)] transition-all duration-200 hover:shadow-[0_6px_0_0_rgba(11,31,59,0.15)] hover:-translate-y-1">
      {/* Left accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0B1F3B]"></div>
      
      <div className="p-6 pl-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-[#0B1F3B] mb-1.5 truncate">
              {hobby.title}
            </h3>
            <span className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">{hobby.level}</span>
          </div>
          <div className="flex space-x-1 ml-3">
            <button
              onClick={() => onEdit(hobby)}
              className="p-1.5 text-[#94A3B8] hover:text-[#0B1F3B] transition-colors"
              aria-label="Edit habit"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(hobby._id)}
              className="p-1.5 text-[#94A3B8] hover:text-[#0B1F3B] transition-colors"
              aria-label="Delete habit"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Current Streak</span>
            <span className="text-3xl font-bold text-[#0B1F3B]">{hobby.currentStreak || 0}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Best Streak</span>
            <span className="text-3xl font-bold text-[#475569]">{hobby.longestStreak || 0}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#0B1F3B] transition-all duration-300"
              style={{ 
                width: `${Math.min((hobby.currentStreak || 0) / Math.max(hobby.longestStreak || 1, 1) * 100, 100)}%` 
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onViewSessions}
          className="w-full py-2.5 text-sm font-medium text-[#475569] bg-white border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors"
        >
          View Sessions
        </button>
      </div>
    </div>
  );
};

export default HobbyCard;
