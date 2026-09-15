# Blog App

A modern, full-stack blog application built with **Next.js 15** and **MongoDB**. This application provides a complete blogging platform with create, read, update, and delete (CRUD) functionality for blog posts.

![Homepage](https://github.com/user-attachments/assets/d7585720-d4d7-4d71-ad41-a4228a789f33)

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and MongoDB
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Complete CRUD Operations**: Create, read, update, and delete blog posts
- **Rich Content Management**: Support for titles, authors, excerpts, full content, and tags
- **Error Handling**: Robust error handling with user-friendly messages
- **Form Validation**: Client-side validation with character limits and required fields
- **Clean UI/UX**: Intuitive interface with smooth navigation and transitions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MongoDB with Mongoose ODM
- **API**: Next.js API Routes
- **Development**: ESLint, Hot Reload

## 📦 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── posts/         # Blog posts CRUD endpoints
│   ├── create/            # Create post page
│   ├── edit/[id]/         # Edit post page
│   ├── posts/[id]/        # Individual post view
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/
│   └── mongodb.ts         # Database connection utility
├── models/
│   └── BlogPost.ts        # MongoDB schema and model
└── types/
    └── global.d.ts        # Global type declarations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
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
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your MongoDB connection string:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/blog-app
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
   ```

4. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Screenshots

### Create Post Form
![Create Post Form](https://github.com/user-attachments/assets/868ff687-5a3e-4f90-9ca8-eacc1cd53076)

### Error Handling
![Error Handling](https://github.com/user-attachments/assets/985232c5-0283-4df2-bb25-174f83c711ca)

## 🔗 API Endpoints

- `GET /api/posts` - Fetch all blog posts
- `POST /api/posts` - Create a new blog post
- `GET /api/posts/[id]` - Fetch a specific blog post
- `PUT /api/posts/[id]` - Update a blog post
- `DELETE /api/posts/[id]` - Delete a blog post

## 📄 Data Schema

```typescript
interface IBlogPost {
  _id: string;
  title: string;        // Max 100 characters
  content: string;      // Full blog post content
  excerpt: string;      // Max 200 characters
  author: string;       // Author name
  tags: string[];       // Array of tags
  createdAt: Date;      // Auto-generated
  updatedAt: Date;      // Auto-updated
}
```

## 🎯 Usage

1. **Home Page**: View all blog posts or create your first post
2. **Create Post**: Fill in title, author, excerpt, content, and optional tags
3. **View Post**: Click on any post to read the full content
4. **Edit Post**: Use the edit button to modify existing posts
5. **Delete Post**: Remove posts with confirmation dialog

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your MongoDB connection string as environment variable
4. Deploy automatically

### Other Platforms

The application can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 📝 Environment Variables

```bash
# Required
MONGODB_URI=your_mongodb_connection_string

# Optional (for production)
NEXT_PUBLIC_BASE_URL=your_deployed_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- MongoDB connection required for full functionality
- Form data is lost on page refresh (by design)

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Rich text editor for content creation
- [ ] Image upload and media management
- [ ] Search and filtering capabilities
- [ ] Comments system
- [ ] Social sharing features
- [ ] SEO optimization
- [ ] Performance improvements with caching

## 📞 Support

For support, please open an issue on GitHub or contact the project maintainer.

---

Built with ❤️ using Next.js and MongoDB
# blog-app
this is my blog app
this is my frst contribution
