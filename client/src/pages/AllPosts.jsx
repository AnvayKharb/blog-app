import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { formatDate, truncateText } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllPosts(page, 12);
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

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading posts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Posts</h1>
          <p className="text-gray-600 text-lg">
            Explore all our articles and insights
          </p>
        </div>

        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError(null)} 
          />
        )}

        {loading && (
          <div className="flex justify-center mb-8">
            <LoadingSpinner size="md" text="Loading..." />
          </div>
        )}

        {posts.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts available yet.</p>
            <p className="text-gray-400 mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <article key={post._id} className="card hover:shadow-lg transition duration-200">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link 
                        to={`/post/${post.slug}`}
                        className="hover:text-blue-600 transition duration-200"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">
                      By {post.author?.username} • {formatDate(post.createdAt)}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {truncateText(post.excerpt || post.content, 150)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                    >
                      Read more →
                    </Link>
                    <span className="text-gray-500">{post.views} views</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
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
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
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
                  ))}
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
          </>
        )}
      </div>
    </div>
  );
};

export default AllPosts;