import Link from 'next/link';
import { IBlogPost } from '@/models/BlogPost';

async function getBlogPosts(): Promise<IBlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Blog</h1>
          <p className="text-xl text-gray-600 mb-6">Welcome to my personal blog</p>
          <Link
            href="/create"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create New Post
          </Link>
        </header>

        <main>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">No posts yet</h2>
              <p className="text-gray-600 mb-6">Start by creating your first blog post!</p>
              <Link
                href="/create"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    <Link href={`/posts/${post._id}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>By {post.author}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
