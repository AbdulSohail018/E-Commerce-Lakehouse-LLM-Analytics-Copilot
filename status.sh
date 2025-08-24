#!/bin/bash

echo "🔍 E-Commerce Analytics Copilot - System Status"
echo "=============================================="

# Check backend
echo "🔧 Backend API Server:"
if curl -s http://localhost:8000/health > /dev/null; then
    echo "   ✅ Running on http://localhost:8000"
    echo "   📊 API Docs: http://localhost:8000/docs"
else
    echo "   ❌ Not running"
fi

# Check frontend
echo ""
echo "🌐 Frontend React App:"
if curl -s http://localhost:3000 > /dev/null; then
    echo "   ✅ Running on http://localhost:3000"
else
    echo "   ❌ Not running"
fi

# Test API functionality
echo ""
echo "🧪 API Functionality Test:"
RESPONSE=$(curl -s http://localhost:8000/data/overview)
if [[ $RESPONSE == *"customers"* ]]; then
    echo "   ✅ Data API working"
    echo "   📈 Sample data loaded successfully"
else
    echo "   ❌ Data API not responding properly"
fi

# Check analytics endpoint
echo ""
echo "🤖 AI Analytics Test:"
AI_RESPONSE=$(curl -s -X POST http://localhost:8000/analytics/query \
    -H "Content-Type: application/json" \
    -d '{"query": "Show me overview metrics"}')
if [[ $AI_RESPONSE == *"insights"* ]]; then
    echo "   ✅ AI query processing working"
else
    echo "   ❌ AI analytics not working"
fi

echo ""
echo "📋 Quick Access URLs:"
echo "   🏠 Main Dashboard:     http://localhost:3000"
echo "   🔗 Backend API:        http://localhost:8000"
echo "   📚 API Documentation:  http://localhost:8000/docs"
echo "   📊 Data Overview:      http://localhost:8000/data/overview"
echo ""
echo "🎯 Ready to use! Visit http://localhost:3000 to start exploring your data!"