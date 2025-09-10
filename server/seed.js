require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app';

const samplePosts = [
  {
    title: "Welcome to Our Blog!",
    content: `Welcome to our amazing blog! We're excited to share our thoughts, ideas, and experiences with you.

This blog was built with modern web technologies including React, Express.js, and MongoDB. It features a responsive design that looks great on all devices.

Here are some key features of our blog:

• Responsive design that works on mobile, tablet, and desktop
• Admin authentication system for secure content management
• Full CRUD operations for blog posts
• Tag system for organizing content
• View tracking to see popular posts
• Draft and published post states

We hope you enjoy reading our content and look forward to growing our community of readers!

Feel free to explore all the posts and don't forget to check back regularly for new content.`,
    excerpt: "Welcome to our amazing blog! We're excited to share our thoughts and ideas with our community of readers.",
    status: 'published',
    tags: ['welcome', 'introduction', 'blog'],
    featured: true
  },
  {
    title: "Getting Started with React Development",
    content: `React has revolutionized the way we build user interfaces. In this post, we'll explore the fundamentals of React development and why it's become such a popular choice for frontend developers.

## What is React?

React is a JavaScript library for building user interfaces, particularly web applications. Created by Facebook (now Meta), React allows developers to create reusable UI components that manage their own state.

## Key Benefits of React

**Component-Based Architecture**: React applications are built using components, which are reusable pieces of code that manage their own state and render UI elements.

**Virtual DOM**: React uses a virtual representation of the DOM to optimize performance by minimizing direct manipulations of the actual DOM.

**Unidirectional Data Flow**: Data flows down from parent components to child components, making applications more predictable and easier to debug.

## Getting Started

To start with React, you'll need:
1. Node.js installed on your computer
2. A text editor or IDE
3. Basic knowledge of JavaScript and HTML

The easiest way to create a new React app is using Create React App or modern tools like Vite, which we used for this blog!

## Conclusion

React is an excellent choice for building modern web applications. Its component-based architecture and excellent ecosystem make it a joy to work with.

Happy coding!`,
    excerpt: "Explore the fundamentals of React development and learn why it's become the go-to choice for modern frontend applications.",
    status: 'published',
    tags: ['react', 'javascript', 'frontend', 'development'],
    featured: false
  },
  {
    title: "Building RESTful APIs with Express.js",
    content: `Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. In this post, we'll explore how to build RESTful APIs with Express.

## What is a RESTful API?

REST (Representational State Transfer) is an architectural pattern for designing web services. A RESTful API uses HTTP methods to perform operations on resources identified by URLs.

## Setting Up Express.js

First, you'll need to install Express in your project:

\`\`\`bash
npm install express
\`\`\`

Here's a basic Express server:

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/posts', (req, res) => {
  res.json({ message: 'Getting all posts' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## HTTP Methods in REST

- **GET**: Retrieve data
- **POST**: Create new data
- **PUT**: Update existing data
- **DELETE**: Remove data

## Best Practices

1. Use proper HTTP status codes
2. Implement proper error handling
3. Use middleware for common functionality
4. Validate input data
5. Implement authentication and authorization

## Conclusion

Express.js makes it easy to build powerful APIs quickly. Combined with MongoDB and Mongoose, you can create full-featured backend applications.

This blog's backend API was built using these exact principles!`,
    excerpt: "Learn how to build robust RESTful APIs using Express.js, including best practices and real-world examples.",
    status: 'published',
    tags: ['express', 'nodejs', 'api', 'backend'],
    featured: false
  },
  {
    title: "Modern CSS with Tailwind CSS",
    content: `Tailwind CSS has changed the way many developers approach styling web applications. Instead of writing custom CSS, Tailwind provides utility classes that you can compose to build any design.

## Why Tailwind CSS?

**Utility-First Approach**: Instead of semantic class names, Tailwind provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.

**Responsive Design**: Tailwind makes it easy to build responsive layouts with its mobile-first breakpoint system.

**Customizable**: Despite being utility-first, Tailwind is highly customizable through its configuration file.

## Getting Started

Install Tailwind CSS in your project:

\`\`\`bash
npm install -D tailwindcss
npx tailwindcss init
\`\`\`

Add Tailwind to your CSS:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Example Usage

Here's how you might style a card component:

\`\`\`html
<div class="bg-white rounded-lg shadow-md p-6 max-w-md">
  <h2 class="text-xl font-semibold mb-4">Card Title</h2>
  <p class="text-gray-600 mb-4">Card content goes here.</p>
  <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Action
  </button>
</div>
\`\`\`

## Benefits

- **Faster Development**: No need to write custom CSS
- **Consistent Design**: Utility classes ensure consistency
- **Smaller CSS Bundle**: Only the utilities you use are included
- **Easy Maintenance**: Changes are made directly in HTML

## Conclusion

Tailwind CSS is perfect for rapid development while maintaining design consistency. This entire blog was styled using Tailwind CSS!

Give it a try in your next project and experience the difference.`,
    excerpt: "Discover how Tailwind CSS's utility-first approach can speed up your development while maintaining beautiful, consistent designs.",
    status: 'published',
    tags: ['css', 'tailwind', 'frontend', 'styling'],
    featured: false
  },
  {
    title: "Draft: Future of Web Development",
    content: `This is a draft post about the future of web development. 

We'll explore emerging technologies, trends, and what developers should focus on learning.

Topics to cover:
- WebAssembly
- Progressive Web Apps
- Serverless architecture
- AI and ML integration
- Web3 and blockchain
- Edge computing

This post is still being written and will be published soon!`,
    excerpt: "A look into the future of web development and emerging technologies that will shape how we build applications.",
    status: 'draft',
    tags: ['future', 'trends', 'webdev'],
    featured: false
  }
];

async function seedData() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin user exists, create if not
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('Creating admin user...');
      adminUser = new User({
        username: 'admin',
        email: 'admin@blogapp.com',
        password: 'password123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created (email: admin@blogapp.com, password: password123)');
    } else {
      console.log('Admin user already exists');
    }

    // Clear existing posts
    console.log('Clearing existing posts...');
    await Post.deleteMany({});

    // Create sample posts
    console.log('Creating sample posts...');
    for (const postData of samplePosts) {
      const post = new Post({
        ...postData,
        author: adminUser._id
      });
      await post.save();
      console.log(`Created post: ${post.title}`);
    }

    console.log('✅ Seed data created successfully!');
    console.log('🔐 Admin login credentials:');
    console.log('   Email: admin@blogapp.com');
    console.log('   Password: password123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedData();