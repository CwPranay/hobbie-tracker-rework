import { Edit2, Trash2, Flame, Trophy, Lock, Globe } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import IconButton from './ui/IconButton';
import Button from './ui/Button';

const HobbyCard = ({ hobby, onEdit, onDelete, onViewSessions }) => {
  const getLevelVariant = (level) => {
    switch (level) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card hover className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
            {hobby.title}
          </h3>
          <Badge variant={getLevelVariant(hobby.level)}>
            {hobby.level}
          </Badge>
        </div>
        <div className="flex space-x-1 ml-2">
          <IconButton
            icon={Edit2}
            onClick={() => onEdit(hobby)}
            label="Edit hobby"
            variant="ghost"
            size="sm"
          />
          <IconButton
            icon={Trash2}
            onClick={() => onDelete(hobby._id)}
            label="Delete hobby"
            variant="ghost"
            size="sm"
          />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Flame size={16} className="text-orange-500" />
            <span>Current Streak</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {hobby.currentStreak || 0}
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Trophy size={16} className="text-amber-500" />
            <span>Best Streak</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {hobby.longestStreak || 0}
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            {hobby.isPublic ? <Globe size={16} /> : <Lock size={16} />}
            <span>Visibility</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {hobby.isPublic ? 'Public' : 'Private'}
          </span>
        </div>
      </div>

      <Button
        onClick={onViewSessions}
        variant="secondary"
        className="w-full"
      >
        View Sessions
      </Button>
    </Card>
  );
};

export default HobbyCard;
