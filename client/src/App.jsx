import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import AllPosts from './pages/AllPosts';
import PostDetail from './pages/PostDetail';

// Admin pages
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import AdminDashboard from './pages/admin/Dashboard';
import PostEditor from './pages/admin/PostEditor';
import PostsManagement from './pages/admin/PostsManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            
            {/* Auth Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts" element={
              <ProtectedRoute>
                <PostsManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts/new" element={
              <ProtectedRoute>
                <PostEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts/:id/edit" element={
              <ProtectedRoute>
                <PostEditor />
              </ProtectedRoute>
            } />
            
            {/* 404 Page */}
            <Route path="*" element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
