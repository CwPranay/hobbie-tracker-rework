import { useState, useEffect } from 'react';
import { Clock, Calendar, Rss } from 'lucide-react';
import axios from '../api/axios';
import Layout from '../components/Layout';

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
    const sessionDate = new Date(date);
    const today = new Date();
    
    const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const diffTime = todayDay - sessionDay;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
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
        <div className="bg-[#F8FAFC] min-h-screen">
          <div className="max-w-3xl mx-auto px-8 py-20">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-[#E2E8F0] rounded mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_0_0_rgba(11,31,59,0.1)]"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-3xl mx-auto px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#0B1F3B]">Activity Feed</h1>
            <p className="text-[#475569] mt-2">See what people you follow are practicing</p>
          </div>

          {feed.length === 0 ? (
            <div className="text-center py-16 border border-[#E2E8F0] rounded-lg bg-[#F1F5F9] shadow-[0_4px_0_0_rgba(11,31,59,0.1)]">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0_3px_0_0_rgba(11,31,59,0.08)] p-3 mb-4">
                <Rss className="w-8 h-8 text-[#0B1F3B]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">No activity yet</h3>
              <p className="text-[#475569] max-w-sm mx-auto">
                Follow other users to see their practice sessions here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {feed.map((session) => (
                <div key={session._id} className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-[0_4px_0_0_rgba(11,31,59,0.1)] hover:shadow-[0_6px_0_0_rgba(11,31,59,0.15)] hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0B1F3B] flex items-center justify-center text-white font-medium flex-shrink-0 shadow-[0_2px_0_0_rgba(0,0,0,0.1)]">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-1 mb-2">
                        <span className="font-semibold text-[#0B1F3B]">
                          {session.user?.name}
                        </span>
                        <span className="text-[#475569]">practiced</span>
                        <span className="font-medium text-[#2563EB]">
                          {session.hobby?.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-[#64748B] mb-2">
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
                        <p className="text-sm text-[#0B1F3B] mt-3 bg-[#F1F5F9] rounded-lg p-3 border border-[#E2E8F0]">
                          {session.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
