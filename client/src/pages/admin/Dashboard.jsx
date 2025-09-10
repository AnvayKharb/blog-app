import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    totalViews: 0,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllAdminPosts(1, 10);
      setPosts(response.posts);
      
      // Calculate stats
      const published = response.posts.filter(post => post.status === 'published').length;
      const drafts = response.posts.filter(post => post.status === 'draft').length;
      const totalViews = response.posts.reduce((sum, post) => sum + post.views, 0);
      
      setStats({
        total: response.pagination.totalPosts,
        published,
        drafts,
        totalViews,
      });
    } catch (err) {
      setError('Failed to load dashboard data.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(postId);
        setPosts(posts.filter(post => post._id !== postId));
        setStats(prev => ({
          ...prev,
          total: prev.total - 1,
        }));
      } catch (err) {
        setError('Failed to delete post.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.username}! Manage your blog posts here.</p>
        </div>

        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError(null)} 
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-blue-600">{stats.total}</h3>
            <p className="text-gray-600">Total Posts</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-green-600">{stats.published}</h3>
            <p className="text-gray-600">Published</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-yellow-600">{stats.drafts}</h3>
            <p className="text-gray-600">Drafts</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-purple-600">{stats.totalViews}</h3>
            <p className="text-gray-600">Total Views</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/posts/new"
              className="btn-primary"
            >
              ✏️ New Post
            </Link>
            <Link
              to="/admin/posts"
              className="btn-secondary"
            >
              📋 Manage Posts
            </Link>
            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              🌐 View Blog
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
            <Link
              to="/admin/posts"
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
            >
              View All →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No posts yet. Create your first post!</p>
              <Link
                to="/admin/posts/new"
                className="btn-primary"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.slice(0, 5).map((post) => (
                    <tr key={post._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {post.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/posts/${post._id}/edit`}
                            className="text-blue-600 hover:text-blue-900 transition duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="text-red-600 hover:text-red-900 transition duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;