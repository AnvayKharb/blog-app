import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../../services/api';
import { formatDate, truncateText } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';

const PostsManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchPosts(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  const fetchPosts = async (page = 1, status = 'all') => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllAdminPosts(page, 15, status);
      setPosts(response.posts);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleDeletePost = async (postId, postTitle) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      try {
        setDeleteLoading(postId);
        await postsAPI.deletePost(postId);
        setPosts(posts.filter(post => post._id !== postId));
        
        // Update pagination if needed
        if (posts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchPosts(currentPage, statusFilter);
        }
      } catch (err) {
        setError('Failed to delete post. Please try again.');
        console.error('Error deleting post:', err);
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
    };
    
    return (
      <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading posts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
              <p className="text-gray-600 mt-2">Create, edit, and manage your blog posts</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/admin/posts/new"
                className="btn-primary"
              >
                ✏️ New Post
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError(null)} 
          />
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Posts ({pagination.totalPosts || 0})
          </button>
          <button
            onClick={() => handleStatusFilter('published')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
              statusFilter === 'published'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => handleStatusFilter('draft')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
              statusFilter === 'draft'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Drafts
          </button>
        </div>

        {loading && (
          <div className="flex justify-center mb-8">
            <LoadingSpinner size="md" text="Loading..." />
          </div>
        )}

        {/* Posts Table/List */}
        {posts.length === 0 && !loading ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {statusFilter === 'all' 
                ? 'No posts yet. Create your first post!' 
                : `No ${statusFilter} posts found.`
              }
            </p>
            <Link
              to="/admin/posts/new"
              className="btn-primary"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="card">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {post.title}
                          </div>
                          {post.excerpt && (
                            <div className="text-sm text-gray-500 mt-1">
                              {truncateText(post.excerpt, 60)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(post.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link
                            to={`/admin/posts/${post._id}/edit`}
                            className="text-blue-600 hover:text-blue-900 transition duration-200"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/post/${post.slug}`}
                            target="_blank"
                            className="text-green-600 hover:text-green-900 transition duration-200"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post._id, post.title)}
                            disabled={deleteLoading === post._id}
                            className="text-red-600 hover:text-red-900 transition duration-200 disabled:opacity-50"
                          >
                            {deleteLoading === post._id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 flex-1">
                      {post.title}
                    </h3>
                    {getStatusBadge(post.status)}
                  </div>
                  
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 mb-3">
                      {truncateText(post.excerpt, 100)}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{post.views} views</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link
                      to={`/admin/posts/${post._id}/edit`}
                      className="text-blue-600 hover:text-blue-900 font-medium transition duration-200"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/post/${post.slug}`}
                      target="_blank"
                      className="text-green-600 hover:text-green-900 font-medium transition duration-200"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post._id, post.title)}
                      disabled={deleteLoading === post._id}
                      className="text-red-600 hover:text-red-900 font-medium transition duration-200 disabled:opacity-50"
                    >
                      {deleteLoading === post._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrev}
              className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                pagination.hasPrev
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNext}
              className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                pagination.hasNext
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsManagement;