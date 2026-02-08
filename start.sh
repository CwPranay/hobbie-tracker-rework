#!/bin/bash

echo "🎯 Starting HobbyTrack..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   macOS: brew services start mongodb-community"
    echo "   Linux: sudo systemctl start mongodb"
    echo ""
fi

# Start backend
echo "🚀 Starting backend server..."
cd server
npm install > /dev/null 2>&1
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend..."
cd client
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ HobbyTrack is running!"
echo ""
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
