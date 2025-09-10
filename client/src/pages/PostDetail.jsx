import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPostBySlug(slug);
      setPost(response.post);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Post not found.');
      } else {
        setError('Failed to load post. Please try again later.');
      }
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading post..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert type="error" message={error} />
          <div className="text-center mt-8">
            <Link 
              to="/"
              className="btn-primary"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link 
            to="/"
            className="btn-primary"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition duration-200">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/posts" className="hover:text-blue-600 transition duration-200">
                Posts
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 truncate max-w-xs">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm">
          <div className="px-8 py-12">
            {/* Article Header */}
            <header className="mb-8 pb-8 border-b border-gray-200">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
                <div className="flex items-center">
                  <span className="font-medium">By {post.author?.username}</span>
                </div>
                <div className="flex items-center">
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <span>{post.views} views</span>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {/* Using whitespace-pre-line to preserve line breaks */}
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Published on {formatDate(post.createdAt)}
                  {post.updatedAt !== post.createdAt && (
                    <span> • Updated on {formatDate(post.updatedAt)}</span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/posts"
                    className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                  >
                    ← All Posts
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* Back to posts */}
        <div className="text-center mt-8">
          <Link
            to="/posts"
            className="btn-secondary"
          >
            View More Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;