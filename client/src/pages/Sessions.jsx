import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Clock, Calendar, Activity as ActivityIcon } from 'lucide-react';
import axios from '../api/axios';
import Layout from '../components/Layout';
import SessionModal from '../components/SessionModal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Skeleton from '../components/ui/Skeleton';

const Sessions = () => {
  const [searchParams] = useSearchParams();
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobby, setSelectedHobby] = useState('');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHobbies();
  }, []);

  useEffect(() => {
    const hobbyId = searchParams.get('hobby');
    if (hobbyId && hobbies.length > 0) {
      setSelectedHobby(hobbyId);
    }
  }, [searchParams, hobbies]);

  useEffect(() => {
    if (selectedHobby) {
      fetchSessions();
    }
  }, [selectedHobby]);

  const fetchHobbies = async () => {
    try {
      const { data } = await axios.get('/hobbies');
      setHobbies(data);
      if (data.length > 0 && !searchParams.get('hobby')) {
        setSelectedHobby(data[0]._id);
      }
    } catch (error) {
      console.error('Failed to fetch hobbies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const { data } = await axios.get(`/sessions/${selectedHobby}`);
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const handleModalClose = (refresh) => {
    setShowModal(false);
    if (refresh) {
      fetchSessions();
      fetchHobbies();
    }
  };

  const formatDate = (date) => {
    const sessionDate = new Date(date);
    const today = new Date();
    
    // Set both dates to midnight for accurate day comparison
    const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const diffTime = todayDay - sessionDay;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return sessionDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: sessionDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton variant="card" className="h-32 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" className="h-24" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (hobbies.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
              <ActivityIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hobbies yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Add a hobby first to track sessions</p>
          </div>
        </div>
      </Layout>
    );
  }

  const currentHobby = hobbies.find(h => h._id === selectedHobby);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Sessions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your practice time and progress</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedHobby}
              onChange={(e) => setSelectedHobby(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              {hobbies.map((hobby) => (
                <option key={hobby._id} value={hobby._id}>
                  {hobby.title}
                </option>
              ))}
            </select>
            <Button onClick={() => setShowModal(true)} className="inline-flex items-center space-x-2">
              <Plus size={18} />
              <span className="hidden sm:inline">Add Session</span>
            </Button>
          </div>
        </div>

        {currentHobby && (
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{currentHobby.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Level</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{currentHobby.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Streak</p>
                <p className="text-base font-semibold text-orange-600 dark:text-orange-400">{currentHobby.currentStreak || 0} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Best Streak</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{currentHobby.longestStreak || 0} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sessions</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{sessions.length}</p>
              </div>
            </div>
          </Card>
        )}

        {sessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No sessions yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start tracking your practice time</p>
            <Button onClick={() => setShowModal(true)} className="inline-flex items-center space-x-2">
              <Plus size={18} />
              <span>Add First Session</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <Card key={session._id} hover className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {formatDuration(session.duration)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(session.date)}
                        </span>
                      </div>
                      {session.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{session.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {showModal && (
          <SessionModal
            hobbyId={selectedHobby}
            onClose={handleModalClose}
          />
        )}
      </div>
    </Layout>
  );
};

export default Sessions;
