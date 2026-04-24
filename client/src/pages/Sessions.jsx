import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Clock, Calendar, Activity } from 'lucide-react';
import axios from '../api/axios';
import Layout from '../components/Layout';
import SessionModal from '../components/SessionModal';

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
        <div className="bg-[#F8FAFC] min-h-screen">
          <div className="max-w-4xl mx-auto px-8 py-20">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-[#E2E8F0] rounded mb-8"></div>
              <div className="h-32 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_0_0_rgba(11,31,59,0.1)] mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_0_0_rgba(11,31,59,0.1)]"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (hobbies.length === 0) {
    return (
      <Layout>
        <div className="bg-[#F8FAFC] min-h-screen">
          <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0_3px_0_0_rgba(11,31,59,0.08)] p-3 mb-4">
                <Activity className="w-8 h-8 text-[#0B1F3B]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">No habits yet</h3>
              <p className="text-[#475569]">Add a habit first to track sessions</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentHobby = hobbies.find(h => h._id === selectedHobby);

  return (
    <Layout>
      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Hero Section with Image */}
        <div className="relative overflow-hidden bg-[#0B1F3B] mb-12">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1723698029382-499e04857aae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9iYmllc3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Hobbies background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hero Content */}
          <div className="relative max-w-4xl mx-auto px-8 py-16">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl font-semibold text-white drop-shadow-lg">Practice Sessions</h1>
                <p className="text-white/90 mt-2 drop-shadow-md">Track your practice time and progress</p>
              </div>
              <div className="flex space-x-3">
                <select
                  value={selectedHobby}
                  onChange={(e) => setSelectedHobby(e.target.value)}
                  className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] shadow-[0_3px_0_0_rgba(11,31,59,0.08)]"
                >
                  {hobbies.map(hobby => (
                    <option key={hobby._id} value={hobby._id}>{hobby.title}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0B1F3B] text-white text-sm font-semibold rounded-lg hover:bg-[#0A1A2F] transition-colors shadow-[0_3px_0_0_rgba(0,0,0,0.1)]"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Add Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 pb-12">

          {currentHobby && (
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 mb-8 shadow-[0_6px_0_0_rgba(11,31,59,0.12)]">
              <h2 className="text-lg font-semibold text-[#0B1F3B] mb-6">{currentHobby.title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider mb-2">Level</p>
                  <p className="text-base font-medium text-[#0B1F3B]">{currentHobby.level}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider mb-2">Current Streak</p>
                  <p className="text-base font-semibold text-[#2563EB]">{currentHobby.currentStreak || 0} days</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider mb-2">Best Streak</p>
                  <p className="text-base font-medium text-[#0B1F3B]">{currentHobby.longestStreak || 0} days</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider mb-2">Total Sessions</p>
                  <p className="text-base font-medium text-[#0B1F3B]">{sessions.length}</p>
                </div>
              </div>
            </div>
          )}

          {sessions.length === 0 ? (
            <div className="text-center py-16 border border-[#E2E8F0] rounded-lg bg-[#F1F5F9] shadow-[0_4px_0_0_rgba(11,31,59,0.1)]">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0_3px_0_0_rgba(11,31,59,0.08)] p-3 mb-4">
                <Clock className="w-8 h-8 text-[#0B1F3B]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">No sessions yet</h3>
              <p className="text-[#475569] mb-6">Start tracking your practice time</p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B1F3B] text-white text-base font-semibold rounded-lg hover:bg-[#0A1A2F] transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add First Session</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session._id} className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-[0_4px_0_0_rgba(11,31,59,0.1)] hover:shadow-[0_6px_0_0_rgba(11,31,59,0.15)] hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-2 bg-[#F1F5F9] rounded-lg">
                        <Clock className="w-5 h-5 text-[#0B1F3B]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-lg font-semibold text-[#0B1F3B]">
                            {formatDuration(session.duration)}
                          </span>
                          <span className="text-sm text-[#64748B] flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(session.date)}
                          </span>
                        </div>
                        {session.notes && (
                          <p className="text-sm text-[#475569] mt-2">{session.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
      </div>
    </Layout>
  );
};

export default Sessions;
