#!/bin/bash

echo "🚀 Starting E-Commerce Lakehouse LLM Analytics Copilot"
echo "========================================================="

# Kill any existing processes on the ports
echo "🔧 Cleaning up existing processes..."
pkill -f "uvicorn.*8000" || true
pkill -f "react-scripts.*3000" || true

# Wait a moment for cleanup
sleep 2

echo "🔧 Starting Backend API Server (Port 8000)..."
cd backend
source venv/bin/activate
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

echo "🔧 Starting Frontend React App (Port 3000)..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Application Started Successfully!"
echo "========================================================="
echo "🌐 Frontend (React App):     http://localhost:3000"
echo "🔗 Backend API:              http://localhost:8000"
echo "📚 API Documentation:        http://localhost:8000/docs"
echo "📊 Data Overview:            http://localhost:8000/data/overview"
echo ""
echo "💡 Features Available:"
echo "   • AI-Powered Natural Language Queries"
echo "   • Real-time Analytics Dashboard"
echo "   • Interactive Data Visualizations"
echo "   • E-commerce Data Exploration"
echo ""
echo "🔍 Sample Natural Language Queries:"
echo "   • 'Show me revenue trends over time'"
echo "   • 'Which are the top products by sales?'"
echo "   • 'How are customer segments distributed?'"
echo "   • 'Compare sales across product categories'"
echo ""
echo "🛑 To stop the application, press Ctrl+C"
echo "========================================================="

# Function to handle cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down application..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    pkill -f "uvicorn.*8000" || true
    pkill -f "react-scripts.*3000" || true
    echo "✅ Application stopped successfully!"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for user input
echo "Press Ctrl+C to stop the application..."
wait