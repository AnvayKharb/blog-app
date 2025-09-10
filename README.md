# Full-Stack Blog Application

A modern, fully functional blog application with admin access, built with React, Express.js, and MongoDB. Features a responsive design, authentication system, and complete CRUD operations for blog post management.

## 🚀 Features

### Public Features
- **Responsive Blog Interface**: Clean, modern design that works on all devices
- **Post Viewing**: Browse all blog posts with pagination
- **Individual Post Pages**: Detailed post view with author information and view tracking
- **SEO-Friendly URLs**: Posts accessible via clean slug URLs
- **Tag System**: Posts can be categorized with tags

### Admin Features
- **Secure Authentication**: JWT-based authentication system
- **Admin Dashboard**: Overview of posts, views, and statistics
- **Post Management**: Create, edit, delete, and manage blog posts
- **Draft System**: Save posts as drafts before publishing
- **Rich Text Editing**: Full-featured post editor with formatting
- **Media Management**: Upload and manage images (coming soon)

### Technical Features
- **Full-Stack Architecture**: Separate client and server applications
- **RESTful API**: Clean API design with proper error handling
- **Database Integration**: MongoDB with Mongoose ODM
- **State Management**: React Context for authentication
- **Responsive Design**: Tailwind CSS for modern, mobile-first design
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling throughout the app

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and context
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful icon set

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing
- **Express Validator**: Request validation

## 📁 Project Structure

```
blog-app/
├── client/                 # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # React context providers
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin-only pages
│   │   │   └── ...        # Public pages
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   └── ...
│   └── package.json
├── server/                # Express backend application
│   ├── models/           # Mongoose data models
│   ├── routes/           # Express route handlers
│   ├── middleware/       # Custom middleware
│   ├── index.js          # Server entry point
│   └── package.json
├── package.json          # Root package.json for scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnvayKharb/blog-app.git
   cd blog-app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system, or use MongoDB Atlas for a cloud database.

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This command starts both the backend server (port 5000) and frontend development server (port 5173) concurrently.

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📖 Usage

### For Readers (Public Access)
1. Visit the homepage to see latest blog posts
2. Click "Explore All Posts" or navigate to `/posts` to see all posts
3. Click on any post title to read the full article
4. Use browser back button or navigation to return to post list

### For Administrators
1. **Create Admin Account**: Navigate to `/admin/register` to create your first admin account
2. **Login**: Go to `/admin/login` to access the admin panel
3. **Dashboard**: View post statistics and quick actions at `/admin`
4. **Create Posts**: Use "New Post" button to create blog articles
5. **Manage Posts**: Edit, delete, or change post status from the posts management page

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh JWT token

#### Blog Posts
- `GET /api/posts` - Get published posts (public)
- `GET /api/posts/:slug` - Get single post by slug (public)
- `GET /api/posts/admin/all` - Get all posts (admin)
- `POST /api/posts` - Create new post (admin)
- `PUT /api/posts/:id` - Update post (admin)
- `DELETE /api/posts/:id` - Delete post (admin)

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
1. Modifying `tailwind.config.js` for theme customization
2. Updating component classes in React components
3. Adding custom CSS in `src/index.css`

### Features
- Add new pages by creating components in `src/pages/`
- Extend the API by adding routes in `server/routes/`
- Add new data models in `server/models/`

## 🔒 Security Features

- **Password Security**: Passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Admin routes require valid authentication
- **Input Validation**: Both client and server-side validation
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Sensitive data stored in environment variables

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the client: `cd client && npm run build`
2. Deploy the `dist` folder to your preferred hosting service
3. Update API base URL in production

### Backend (Railway/Render/Heroku)
1. Set up MongoDB Atlas or cloud MongoDB instance
2. Configure environment variables on your hosting platform
3. Deploy the `server` directory
4. Update CORS settings for production domain

### Full-Stack Deployment
- Use platforms like Railway or Render for full-stack deployment
- Configure environment variables for production
- Set up MongoDB Atlas for database hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Rich text editing is basic (plain text with line breaks)
- Image upload functionality not yet implemented
- Email notifications not implemented
- Search functionality not yet available

## 🔮 Future Enhancements

- [ ] Rich text editor with formatting
- [ ] Image upload and management
- [ ] Comment system
- [ ] Search functionality
- [ ] Email notifications
- [ ] Social media integration
- [ ] SEO optimizations
- [ ] Performance optimizations
- [ ] Mobile app version

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the maintainer

---

Built with ❤️ by [AnvayKharb](https://github.com/AnvayKharb)