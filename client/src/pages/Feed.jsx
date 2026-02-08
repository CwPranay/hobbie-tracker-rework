import { useState, useEffect } from 'react';
import { Clock, Calendar, Rss } from 'lucide-react';
import axios from '../api/axios';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Skeleton from '../components/ui/Skeleton';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const { data } = await axios.get('/feed');
      setFeed(data);
    } catch (error) {
      console.error('Failed to fetch feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const sessionDate = new Date(date);
    const diffTime = Math.abs(now - sessionDate);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return sessionDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" className="h-32" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Feed</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">See what people you follow are practicing</p>
        </div>

        {feed.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
              <Rss className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No activity yet</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              Follow other users to see their practice sessions here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {feed.map((session) => (
              <Card key={session._id} hover className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-1 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {session.user?.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">practiced</span>
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {session.hobby?.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatDuration(session.duration)}
                      </span>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(session.date)}
                      </span>
                    </div>
                    {session.notes && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        {session.notes}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Feed;
