import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Target } from 'lucide-react';
import axios from '../api/axios';
import Layout from '../components/Layout';
import HobbyCard from '../components/HobbyCard';
import HobbyModal from '../components/HobbyModal';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';

const Dashboard = () => {
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingHobby, setEditingHobby] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = async () => {
    try {
      const { data } = await axios.get('/hobbies');
      setHobbies(data);
    } catch (error) {
      console.error('Failed to fetch hobbies:', error);
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

  const handleDeleteHobby = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hobby?')) return;
    
    try {
      await axios.delete(`/hobbies/${id}`);
      setHobbies(hobbies.filter(h => h._id !== id));
    } catch (error) {
      console.error('Failed to delete hobby:', error);
    }
  };

  const handleModalClose = (refresh) => {
    setShowModal(false);
    setEditingHobby(null);
    if (refresh) {
      fetchHobbies();
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" className="h-64" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Hobbies</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your progress and build consistency</p>
          </div>
          <Button onClick={handleAddHobby} className="inline-flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Hobby</span>
          </Button>
        </div>

        {hobbies.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hobbies yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Start tracking your hobbies and build consistent practice habits
            </p>
            <Button onClick={handleAddHobby} className="inline-flex items-center space-x-2">
              <Plus size={20} />
              <span>Add Your First Hobby</span>
            </Button>
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

        {showModal && (
          <HobbyModal
            hobby={editingHobby}
            onClose={handleModalClose}
          />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
