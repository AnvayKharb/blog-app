import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { formatDate, truncateText } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllPosts(1, 6); // Get first 6 posts for homepage
      setPosts(response.posts);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading posts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to My Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover insights, stories, and ideas that inspire and inform. Join our community of readers and thinkers.
            </p>
            <div className="mt-10">
              <Link
                to="/posts"
                className="bg-white text-blue-600 font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-200 inline-block"
              >
                Explore All Posts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Posts</h2>
          <p className="text-gray-600 text-lg">Stay up to date with our latest articles and insights</p>
        </div>

        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError(null)} 
          />
        )}

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts available yet.</p>
            <p className="text-gray-400 mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post._id} className="card hover:shadow-lg transition duration-200">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    <Link 
                      to={`/post/${post.slug}`}
                      className="hover:text-blue-600 transition duration-200"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    By {post.author?.username} • {formatDate(post.createdAt)}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {truncateText(post.excerpt || post.content, 120)}
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
        )}

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/posts"
              className="btn-primary inline-block"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;