import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { User as UserIcon, Users, UserPlus, UserMinus, Target } from 'lucide-react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const userId = id || currentUser?._id;
  const isOwnProfile = !id || id === currentUser?._id;

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`/users/profile/${userId}`);
      setProfile(data.user);
      setHobbies(data.hobbies);
      
      if (!isOwnProfile) {
        setIsFollowing(data.user.followers?.some(f => f._id === currentUser._id));
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      if (isFollowing) {
        await axios.post(`/users/unfollow/${userId}`);
        setIsFollowing(false);
        setProfile({ ...profile, followers: profile.followers.filter(f => f._id !== currentUser._id) });
      } else {
        await axios.post(`/users/follow/${userId}`);
        setIsFollowing(true);
        setProfile({ ...profile, followers: [...profile.followers, { _id: currentUser._id }] });
      }
    } catch (error) {
      console.error('Failed to follow/unfollow:', error);
    } finally {
      setFollowLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          <Skeleton variant="card" className="h-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} variant="card" className="h-40" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User not found</h3>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <Card className="p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-20 h-20 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {profile.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
              </div>
            </div>
            {!isOwnProfile && (
              <Button
                onClick={handleFollow}
                disabled={followLoading}
                variant={isFollowing ? 'secondary' : 'primary'}
                className="inline-flex items-center space-x-2"
              >
                {isFollowing ? <UserMinus size={18} /> : <UserPlus size={18} />}
                <span>{followLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-5 h-5 text-gray-400 mr-1" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{hobbies.length}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hobbies</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-5 h-5 text-gray-400 mr-1" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.followers?.length || 0}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <UserIcon className="w-5 h-5 text-gray-400 mr-1" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.following?.length || 0}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {isOwnProfile ? 'My Hobbies' : `${profile.name}'s Hobbies`}
          </h2>

          {hobbies.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {isOwnProfile ? 'No hobbies yet' : 'No public hobbies'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {isOwnProfile ? 'Start by adding your first hobby' : 'This user has no public hobbies'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hobbies.map((hobby) => (
                <Card key={hobby._id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{hobby.title}</h3>
                    <Badge variant={getLevelVariant(hobby.level)}>
                      {hobby.level}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
                      <span className="font-semibold text-orange-600 dark:text-orange-400">
                        {hobby.currentStreak || 0} days
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Best Streak</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {hobby.longestStreak || 0} days
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
