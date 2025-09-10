#!/bin/bash

echo "🚀 Starting Full-Stack Blog Application"
echo "======================================"

# Check if MongoDB is running (you can uncomment this if needed)
# echo "📊 Checking if MongoDB is available..."
# if ! command -v mongod &> /dev/null; then
#     echo "⚠️  MongoDB is not installed. Please install MongoDB to use the full application."
#     echo "   You can use MongoDB Atlas for a cloud database instead."
# fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

echo ""
echo "✨ Starting the application..."
echo ""
echo "🌐 Frontend will be available at: http://localhost:5173"
echo "🔧 Backend API will be available at: http://localhost:5000"
echo ""
echo "📝 To get started:"
echo "   1. Visit http://localhost:5173 to see the blog"
echo "   2. Go to http://localhost:5173/admin/register to create an admin account"
echo "   3. Login and start creating blog posts!"
echo ""
echo "⚠️  Note: You'll need MongoDB running locally or configure a MongoDB Atlas connection"
echo "   in server/.env file for full functionality."
echo ""
echo "Press Ctrl+C to stop the servers."
echo ""

# Start both frontend and backend
npm run dev