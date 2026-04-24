import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import HobbyCard from '../components/HobbyCard';
import HobbyModal from '../components/HobbyModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [hobbies, setHobbies] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, hobbyId: null });
  const [editingHobby, setEditingHobby] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/hobbies');
      setHobbies(data);
      try {
        const sessionsRes = await axios.get('/sessions/recent');
        setRecentSessions(sessionsRes.data || []);
      } catch (err) {
        setRecentSessions([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHobby = () => {
    setEditingHobby(null);
    setShowModal(true);
  };

  const handleEditHobby = (hobby) => {
    setEditingHobby(hobby);
    setShowModal(true);
  };

  const handleDeleteHobby = (id) => {
    setDeleteConfirm({ isOpen: true, hobbyId: id });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/hobbies/${deleteConfirm.hobbyId}`);
      setHobbies(hobbies.filter(h => h._id !== deleteConfirm.hobbyId));
    } catch (error) {
      console.error('Failed to delete hobby:', error);
    }
  };

  const handleModalClose = (refresh) => {
    setShowModal(false);
    setEditingHobby(null);
    if (refresh) {
      fetchData();
    }
  };

  const formatDate = (date) => {
    const sessionDate = new Date(date);
    const today = new Date();
    const diffTime = today - sessionDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Calculate stats
  const totalHabits = hobbies.length;
  const totalSessions = hobbies.reduce((sum, h) => sum + (h.sessionCount || 0), 0);
  const currentStreak = Math.max(...hobbies.map(h => h.currentStreak || 0), 0);

  if (loading) {
    return (
      <Layout>
        <div className="bg-[#F8FAFC] min-h-screen">
          <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="animate-pulse">
              <div className="h-10 w-64 bg-[#E2E8F0] rounded mb-3"></div>
              <div className="h-5 w-80 bg-[#E2E8F0] rounded mb-16"></div>
              <div className="grid grid-cols-3 gap-8 mb-16">
                <div className="h-32 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_0_0_rgba(11,31,59,0.1)]"></div>
                <div className="h-32 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_0_0_rgba(11,31,59,0.1)]"></div>
                <div className="h-32 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_0_0_rgba(11,31,59,0.1)]"></div>
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
        {/* SECTION 1 - HERO WITH IMAGE */}
        <div className="relative overflow-hidden bg-gray-900 mb-20">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1593037515490-c4d56a9ff5ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero background"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/30"></div>
          </div>

          {/* Hero Content */}
          <div className="relative max-w-7xl mx-auto px-8 py-24">
            <div className="max-w-3xl">
              <h1 className="text-6xl font-bold tracking-tight text-white mb-4 leading-tight drop-shadow-lg">
                Welcome back, <span className="text-gray-100">{user?.name?.split(' ')[0]}</span>
              </h1>
              <p className="text-xl text-gray-100 mb-10 drop-shadow-md">
                Track your habits and build lasting consistency
              </p>
              <button
                onClick={handleAddHobby}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#0B1F3B] text-base font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <span>Create Habit</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* DASHBOARD CONTENT */}
        <div className="max-w-7xl mx-auto px-8 pb-20">
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 shadow-[0_6px_0_0_rgba(11,31,59,0.12)] transition-all duration-200 hover:shadow-[0_8px_0_0_rgba(11,31,59,0.18)] hover:-translate-y-1">
              <div className="text-5xl font-bold text-[#0B1F3B] mb-2">{totalHabits}</div>
              <div className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Active Habits</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 shadow-[0_6px_0_0_rgba(11,31,59,0.12)] transition-all duration-200 hover:shadow-[0_8px_0_0_rgba(11,31,59,0.18)] hover:-translate-y-1">
              <div className="text-5xl font-bold text-[#0B1F3B] mb-2">{currentStreak}</div>
              <div className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Current Streak</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 shadow-[0_6px_0_0_rgba(11,31,59,0.12)] transition-all duration-200 hover:shadow-[0_8px_0_0_rgba(11,31,59,0.18)] hover:-translate-y-1">
              <div className="text-5xl font-bold text-[#0B1F3B] mb-2">{totalSessions}</div>
              <div className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Total Sessions</div>
            </div>
          </div>

          {/* Habits Section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#0B1F3B]">Your Habits</h2>
            <button
              onClick={handleAddHobby}
              className="flex items-center space-x-1.5 text-[#2563EB] text-sm font-semibold hover:text-[#1D4ED8] transition-colors"
            >
              <Plus size={18} />
              <span>Add Habit</span>
            </button>
          </div>

          {hobbies.length === 0 ? (
            <div className="text-center py-20 border border-[#E2E8F0] rounded-lg bg-[#F1F5F9] shadow-[0_4px_0_0_rgba(11,31,59,0.1)]">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0_3px_0_0_rgba(11,31,59,0.08)] p-3 mb-4">
                <Plus className="w-8 h-8 text-[#0B1F3B]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">No habits yet</h3>
              <p className="text-[#475569] mb-8 max-w-md mx-auto">
                Start tracking your first habit and build consistency over time
              </p>
              <button
                onClick={handleAddHobby}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B1F3B] text-white text-base font-semibold rounded-lg hover:bg-[#0A1A2F] transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Create Your First Habit</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hobbies.map((hobby) => (
                <HobbyCard
                  key={hobby._id}
                  hobby={hobby}
                  onEdit={handleEditHobby}
                  onDelete={handleDeleteHobby}
                  onViewSessions={() => navigate(`/sessions?hobby=${hobby._id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2 - EXPLORE CATEGORIES */}
        <div className="border-t border-[#E2E8F0] bg-white py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-semibold text-[#0B1F3B] mb-4">Explore Categories</h2>
              <p className="text-lg text-[#475569]">Discover areas to build consistent habits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Reading',
                  label: 'Books,Novels',
                  image: 'https://images.unsplash.com/photo-1725582204163-46d1f246ecd6?q=80&w=1200&auto=format&fit=crop'
                },
                {
                  title: 'Sketch',
                  label: 'Art',
                  image: 'https://images.unsplash.com/photo-1592091077268-001e76b9d3a8?q=80&w=1200&auto=format&fit=crop'
                },
                {
                  title: 'Sports',
                  label: 'Skills,Wellness',
                  image: 'https://images.unsplash.com/photo-1434993568367-36f24aa04d2f?q=80&w=1200&auto=format&fit=crop'
                }
              ].map((category, i) => (
                <div key={i} className="relative h-80 rounded-lg overflow-hidden group cursor-pointer border border-[#E2E8F0] shadow-[0_4px_0_0_rgba(11,31,59,0.1)] hover:shadow-[0_6px_0_0_rgba(11,31,59,0.15)] transition-all duration-200 hover:-translate-y-1">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0B1F3B]/35"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                    <h3 className="text-3xl font-semibold text-white mb-3">{category.title}</h3>
                    <p className="text-sm text-gray-200 font-medium">{category.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3 - WHY HOBBYTRACK */}
        <div className="bg-[#F1F5F9] py-20 border-t border-[#E2E8F0]">
          <div className="max-w-5xl mx-auto px-8">
            <div className="text-center mb-16">
              <div className="flex justify-center items-center space-x-3 mb-6">
                <img 
                  src="/logo-removebg-preview.png" 
                  alt="HobbyTrack" 
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-[#0B1F3B]">Hobby Tracker</span>
              </div>
              <h2 className="text-4xl font-semibold text-[#0B1F3B] mb-4">Why HobbyTrack</h2>
              <p className="text-lg text-[#475569]">
                Everything you need to build lasting habits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: 'Track Daily Progress',
                  description: 'Monitor your habits with simple, intuitive tracking'
                },
                {
                  title: 'Build Streaks',
                  description: 'Stay motivated with visual streak tracking'
                },
                {
                  title: 'Stay Consistent',
                  description: 'Build momentum with daily practice and reminders'
                }
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">{feature.title}</h3>
                  <p className="text-[#475569] leading-relaxed text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4 - FINAL CTA */}
        <div className="border-t border-[#E2E8F0]">
          <div className="bg-[#0B1F3B] py-20">
            <div className="max-w-4xl mx-auto px-8 text-center">
              <h2 className="text-4xl font-semibold text-white mb-6">
                Start building better habits today
              </h2>
              <p className="text-xl text-[#CBD5E1] mb-10">
                Small steps lead to big results
              </p>
              <button
                onClick={handleAddHobby}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#0B1F3B] text-lg font-semibold rounded-lg hover:bg-[#F8FAFC] transition-colors shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <HobbyModal
          hobby={editingHobby}
          onClose={handleModalClose}
        />
      )}

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, hobbyId: null })}
        onConfirm={confirmDelete}
        title="Delete Habit"
        message="Are you sure you want to delete this habit? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </Layout>
  );
};

export default Dashboard;
