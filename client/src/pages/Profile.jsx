import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { User as UserIcon, Users, UserPlus, UserMinus, Target } from 'lucide-react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';

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

  if (loading) {
    return (
      <Layout>
        <div className="bg-[#F8FAFC] min-h-screen">
          <div className="max-w-4xl mx-auto px-8 py-20">
            <div className="animate-pulse">
              <div className="h-48 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_0_0_rgba(11,31,59,0.1)] mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="h-40 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_0_0_rgba(11,31,59,0.1)]"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="bg-[#F8FAFC] min-h-screen">
          <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-[#0B1F3B]">User not found</h3>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 mb-10 shadow-[0_6px_0_0_rgba(11,31,59,0.12)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="w-20 h-20 rounded-lg bg-[#0B1F3B] flex items-center justify-center text-white text-2xl font-bold shadow-[0_3px_0_0_rgba(0,0,0,0.1)]">
                  {profile.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-[#0B1F3B]">{profile.name}</h1>
                  <p className="text-[#64748B]">{profile.email}</p>
                </div>
              </div>
              {!isOwnProfile && (
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`inline-flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                    isFollowing
                      ? 'border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                      : 'bg-[#0B1F3B] text-white hover:bg-[#0A1A2F]'
                  }`}
                >
                  {isFollowing ? <UserMinus size={18} /> : <UserPlus size={18} />}
                  <span>{followLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E2E8F0]">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Target className="w-5 h-5 text-[#94A3B8] mr-1" />
                  <p className="text-2xl font-bold text-[#0B1F3B]">{hobbies.length}</p>
                </div>
                <p className="text-sm text-[#64748B]">Habits</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-5 h-5 text-[#94A3B8] mr-1" />
                  <p className="text-2xl font-bold text-[#0B1F3B]">{profile.followers?.length || 0}</p>
                </div>
                <p className="text-sm text-[#64748B]">Followers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <UserIcon className="w-5 h-5 text-[#94A3B8] mr-1" />
                  <p className="text-2xl font-bold text-[#0B1F3B]">{profile.following?.length || 0}</p>
                </div>
                <p className="text-sm text-[#64748B]">Following</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#0B1F3B] mb-6">
              {isOwnProfile ? 'My Habits' : `${profile.name}'s Habits`}
            </h2>

            {hobbies.length === 0 ? (
              <div className="text-center py-16 border border-[#E2E8F0] rounded-lg bg-[#F1F5F9] shadow-[0_4px_0_0_rgba(11,31,59,0.1)]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0_3px_0_0_rgba(11,31,59,0.08)] p-3 mb-4">
                  <Target className="w-8 h-8 text-[#0B1F3B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">
                  {isOwnProfile ? 'No habits yet' : 'No public habits'}
                </h3>
                <p className="text-[#475569]">
                  {isOwnProfile ? 'Start by adding your first habit' : 'This user has no public habits'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hobbies.map((hobby) => (
                  <div key={hobby._id} className="relative bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-[0_4px_0_0_rgba(11,31,59,0.1)] hover:shadow-[0_6px_0_0_rgba(11,31,59,0.15)] hover:-translate-y-1 transition-all duration-200">
                    {/* Left accent strip */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0B1F3B]"></div>
                    
                    <div className="p-6 pl-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-[#0B1F3B]">{hobby.title}</h3>
                        <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider px-2 py-1 bg-[#F1F5F9] rounded">
                          {hobby.level}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#64748B]">Current Streak</span>
                          <span className="font-semibold text-[#2563EB]">
                            {hobby.currentStreak || 0} days
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#64748B]">Best Streak</span>
                          <span className="font-medium text-[#0B1F3B]">
                            {hobby.longestStreak || 0} days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
