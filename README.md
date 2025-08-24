# E-Commerce Lakehouse LLM Analytics Copilot

A comprehensive analytics platform that combines e-commerce data simulation, modern UI, and AI-powered natural language queries to provide deep insights into business performance.

## Features

### 🏪 **Data Lakehouse Simulation**
- **Synthetic E-commerce Data**: 1,000 customers, 500 products, 5,000+ orders
- **Realistic Data Relationships**: Customer segments, product categories, order patterns
- **Real-time Analytics**: Live data processing and visualization

### 🤖 **AI-Powered Analytics**
- **Natural Language Queries**: Ask questions in plain English
- **Intelligent Data Interpretation**: AI understands business context
- **Automated Insights**: Get key insights with every query
- **Multiple Visualization Types**: Charts, graphs, metrics, and more

### 📊 **Modern Analytics Dashboard**
- **Interactive Visualizations**: Line charts, bar charts, pie charts
- **Real-time Metrics**: Key performance indicators
- **Responsive Design**: Works on desktop and mobile
- **Dark Theme**: Professional, modern interface

### 🔍 **Data Exploration**
- **Customer Analytics**: Segment analysis, lifetime value, demographics
- **Product Performance**: Top products, category analysis, inventory insights
- **Sales Analytics**: Revenue trends, order patterns, channel performance

## Quick Start

### Prerequisites
- Node.js (v16+)
- Python (3.13+)
- pip and npm

### Installation & Launch

**Option 1: One-click launch (Recommended)**
```bash
./launch.sh
```

**Option 2: Manual setup**
```bash
# Install dependencies
npm run install-all

# Start both servers
npm run dev
```

**Option 3: Individual servers**
```bash
# Backend (Terminal 1)
cd backend
source venv/bin/activate
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Frontend (Terminal 2)  
cd frontend
npm start
```

### Verify Installation
```bash
./status.sh
```

This will start:
- Backend API server on http://localhost:8000
- Frontend React app on http://localhost:3000

### 🌐 **LIVE WEBSITE ACCESS:**
**Main Dashboard:** http://localhost:3000
**API Documentation:** http://localhost:8000/docs

### Alternative: Manual Startup

**Backend (Terminal 1):**
```bash
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

## Application Structure

```
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application with analytics engine
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AnalyticsCharts.tsx
│   │   │   ├── QueryInterface.tsx
│   │   │   ├── DataTables.tsx
│   │   │   └── MetricsCards.tsx
│   │   └── App.tsx         # Main app component
│   └── package.json        # Node.js dependencies
└── package.json           # Project configuration
```

## API Endpoints

### Core Endpoints
- `GET /` - Health check
- `GET /data/overview` - Data overview and statistics
- `POST /analytics/query` - Natural language query processing
- `GET /analytics/dashboard` - Dashboard analytics data

### Data Endpoints
- `GET /data/customers` - Customer data with pagination
- `GET /data/products` - Product catalog with pagination
- `GET /data/orders` - Order history with pagination

## Usage Examples

### Natural Language Queries
The AI interface supports various query types:

**Trend Analysis:**
- "Show me revenue trends over the last year"
- "How are monthly sales performing?"

**Product Analytics:**
- "Which are the top 10 products by revenue?"
- "Compare performance across product categories"

**Customer Insights:**
- "What's the distribution of customer segments?"
- "Show me customer purchasing patterns"

**Comparative Analysis:**
- "Compare sales between different channels"
- "Which categories are growing fastest?"

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for Python
- **Pandas**: Data manipulation and analysis
- **Faker**: Synthetic data generation
- **Pydantic**: Data validation and serialization

### Frontend
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe JavaScript
- **Material-UI**: Professional component library
- **Recharts**: Advanced charting library
- **React Query**: Data fetching and state management

### Analytics Engine
- **Custom LLM Integration**: Natural language query processing
- **Statistical Analysis**: Advanced analytics algorithms
- **Data Visualization**: Multiple chart types and formats

## Key Features

### 🎯 **Smart Query Processing**
The AI analytics engine can understand and process queries like:
- Time-based analysis (trends, seasonal patterns)
- Ranking and comparison analysis
- Distribution and segmentation analysis
- General business metrics and KPIs

### 📈 **Advanced Visualizations**
- **Line Charts**: Time series and trend analysis
- **Bar Charts**: Comparative analysis and rankings
- **Pie Charts**: Distribution and composition analysis
- **Metrics Cards**: Key performance indicators
- **Interactive Tables**: Detailed data exploration

### 🔄 **Real-time Updates**
- Live data processing
- Instant query results
- Dynamic visualizations
- Responsive interface updates

## Development

### Adding New Features
1. **Backend**: Add new endpoints in `backend/main.py`
2. **Frontend**: Create new components in `frontend/src/components/`
3. **Analytics**: Extend the LLMAnalytics class for new query types

### Customization
- **Themes**: Modify theme in `frontend/src/App.tsx`
- **Data Schema**: Update data generation in `backend/main.py`
- **Visualizations**: Add new chart types in components

## Performance

- **Data Processing**: Handles 5,000+ orders efficiently
- **Query Response**: Sub-second analytics processing
- **UI Responsiveness**: Optimized React components
- **Memory Usage**: Efficient data structures and caching

## Future Enhancements

- **Real Database Integration**: PostgreSQL/MongoDB support
- **Advanced ML Models**: Predictive analytics and forecasting
- **Real-time Streaming**: Live data ingestion
- **Export Capabilities**: PDF/Excel report generation
- **User Authentication**: Multi-user support
- **API Rate Limiting**: Production-ready scalability

## License

MIT License - Feel free to use and modify for your projects.

## Support

For questions or issues, please check the API documentation at http://localhost:8000/docs when the server is running.