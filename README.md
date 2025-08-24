# E-Commerce Lakehouse LLM Analytics Copilot

A comprehensive analytics platform that combines e-commerce data simulation, modern UI, and AI-powered natural language queries to provide deep insights into business performance.

## 🎥 **Live Demo & Visual Preview**

### 🌐 **Live Website Access**
- **Main Dashboard:** http://localhost:3000
- **API Documentation:** http://localhost:8000/docs  
- **Backend API:** http://localhost:8000

### 📱 **Dashboard Interface Preview**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🎯 E-Commerce Analytics Copilot                                    [Live] │
├─────────────────────────────────────────────────────────────────────────────┤
│ ☰ Menu    │                    DASHBOARD OVERVIEW                          │
│           │                                                                │
│ 📊 Overview│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│ 📈 Analytics   │👥 1,000 │ │📦 500  │ │🛒 5,000 │ │💰 5.16M │ │📊$1,032 │  │
│ 🤖 AI Query│  │Customers│ │Products │ │ Orders  │ │Revenue  │ │Avg Order│  │
│ 👥 Customers  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│ 📦 Products│                                                                │
│ 🛒 Orders  │  ┌─────────────────────┐ ┌─────────────────────┐              │
│           │  │   📈 Revenue Trend   │ │  📊 Top Products     │              │
│           │  │                     │ │                     │              │
│           │  │  /\    /\           │ │  ████████████       │              │
│           │  │ /  \  /  \    /\    │ │  ████████           │              │
│           │  │/    \/    \  /  \   │ │  ██████             │              │
│           │  └─────────────────────┘ └─────────────────────┘              │
│           │                                                                │
│           │  ┌─────────────────────┐ ┌─────────────────────┐              │
│           │  │ 🥧 Customer Segments│ │ 📊 Category Analysis │              │
│           │  │                     │ │                     │              │
│           │  │    Premium ●        │ │  Electronics ████   │              │
│           │  │   Standard ●        │ │  Clothing   ███     │              │
│           │  │     Basic ●         │ │  Home      ██       │              │
│           │  └─────────────────────┘ └─────────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🎯 **Key UI Features**
- **Dark Theme Interface:** Professional, modern design with Material-UI components
- **Real-time Metrics:** Live KPI cards showing customer, product, order, and revenue data
- **Interactive Charts:** Dynamic visualizations including line charts, bar charts, and pie charts
- **AI Query Interface:** Natural language input with suggested queries and instant results
- **Data Tables:** Paginated, searchable tables for customers, products, and orders
- **Responsive Design:** Works seamlessly on desktop and mobile devices

### 🤖 **AI Analytics Demo**

**Sample Query:** "Show me the top 5 products by revenue"

**AI Response:**
```json
{
  "data": {
    "labels": [
      "Profit-focused disintermediate contingency",
      "Fundamental client-server throughput", 
      "Optional client-driven hierarchy",
      "Open-source high-level function",
      "Profound incremental moderator"
    ],
    "values": [120690.73, 117034.24, 111144.1, 108570.13, 108470.27]
  },
  "insights": [
    "Top product: Profit-focused disintermediate contingency ($120,690.73)",
    "Revenue concentration: Top 5 products account for $565,909.45",
    "Average top product revenue: $113,181.89"
  ],
  "visualization_type": "bar"
}
```

### 📊 **Interactive Visualizations**
- **Line Charts:** Revenue trends over time with monthly breakdowns
- **Bar Charts:** Top products, category comparisons, customer rankings
- **Pie Charts:** Customer segment distribution, order status breakdown
- **Metrics Cards:** Real-time KPIs with color-coded performance indicators

### 🎬 **Video Demonstration Guide**

**To create a video demo of your application:**

1. **Record Main Dashboard:**
   - Navigate to http://localhost:3000
   - Show the metrics cards updating in real-time
   - Demonstrate sidebar navigation between sections

2. **Demonstrate AI Queries:**
   - Go to the "AI Query" section
   - Type: "Show me revenue trends over time"
   - Show the generated line chart and insights
   - Try: "Which are the top products by sales?"
   - Demonstrate the bar chart visualization

3. **Explore Data Tables:**
   - Navigate to "Customers" section
   - Show search functionality
   - Demonstrate pagination
   - Switch to "Products" and "Orders" sections

4. **API Documentation:**
   - Visit http://localhost:8000/docs
   - Show the interactive API documentation
   - Test an endpoint directly from the docs

### 📸 **Screenshots to Include:**

1. **Main Dashboard Overview**
   ```bash
   # Navigate to http://localhost:3000 and capture:
   # - Full dashboard with metrics cards
   # - Charts and visualizations
   # - Sidebar navigation
   ```

2. **AI Query Interface**
   ```bash
   # Capture the AI query section showing:
   # - Natural language input field
   # - Suggested query chips
   # - Generated visualization
   # - Insights panel
   ```

3. **Data Tables**
   ```bash
   # Screenshot the data tables showing:
   # - Customer list with search
   # - Product catalog
   # - Order history with filters
   ```

4. **API Documentation**
   ```bash
   # Capture http://localhost:8000/docs showing:
   # - Interactive API endpoints
   # - Request/response examples
   # - Try-it-out functionality
   ```

### 🎥 **Live Demo Walkthrough**

**Follow these steps for a complete demo:**

1. **Start the Application:**
   ```bash
   ./launch.sh
   ```

2. **Open Browser and Navigate:**
   - Main App: http://localhost:3000
   - API Docs: http://localhost:8000/docs

3. **Demo Sequence:**
   - **Overview (30 seconds):** Show metrics and charts
   - **AI Queries (60 seconds):** Demonstrate natural language processing
   - **Data Exploration (30 seconds):** Browse tables and search
   - **API Testing (30 seconds):** Show backend functionality

4. **Key Points to Highlight:**
   - Real-time data processing
   - AI-powered insights generation
   - Professional UI/UX design
   - Comprehensive data coverage

### 📷 **Adding Your Screenshots & Videos**

**To add visual content to this README:**

1. **Create Screenshots:**
   ```bash
   # Run the visual demo guide
   ./create_visual_demo.sh
   
   # Follow the step-by-step instructions to capture:
   # - Dashboard overview
   # - AI query interface
   # - Data tables
   # - API documentation
   ```

2. **Add Screenshots to README:**
   ```markdown
   ## 📸 Application Screenshots
   
   ### Main Dashboard
   ![Dashboard Overview](screenshots/dashboard.png)
   *Real-time analytics dashboard with metrics cards and interactive charts*
   
   ### AI Query Interface
   ![AI Analytics](screenshots/ai-query.png)
   *Natural language query processing with instant visualizations*
   
   ### Data Tables
   ![Data Tables](screenshots/data-tables.png)
   *Comprehensive data exploration with search and pagination*
   
   ### API Documentation
   ![API Docs](screenshots/api-docs.png)
   *Interactive FastAPI documentation with try-it-out functionality*
   ```

3. **Embed Demo Video:**
   ```markdown
   ## 🎥 Live Demo Video
   
   [![E-Commerce Analytics Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
   
   *Click above to watch a 3-minute demo of the application in action*
   ```

4. **Create Animated GIFs:**
   ```markdown
   ### 🎞️ Interactive Features
   
   #### AI Query Processing
   ![AI Query Demo](screenshots/ai-query-demo.gif)
   
   #### Real-time Chart Generation
   ![Chart Generation](screenshots/chart-generation.gif)
   ```

**📁 Recommended File Structure:**
```
screenshots/
├── dashboard.png          # Main dashboard overview
├── ai-query.png          # AI query interface
├── data-tables.png       # Data exploration tables
├── api-docs.png          # FastAPI documentation
├── ai-query-demo.gif     # AI query in action
└── chart-generation.gif  # Chart generation demo
```

## 📸 **Application Screenshots**

<!-- Replace these placeholder sections with actual screenshots when ready -->

### 🏠 Main Dashboard
```
[SCREENSHOT PLACEHOLDER: Dashboard Overview]
📍 Capture: http://localhost:3000
📝 Shows: Metrics cards, charts, sidebar navigation, dark theme
```
*Real-time analytics dashboard with live KPIs and interactive visualizations*

### 🤖 AI Query Interface
```
[SCREENSHOT PLACEHOLDER: AI Analytics]
📍 Capture: http://localhost:3000 → AI Query section
📝 Shows: Natural language input, suggested queries, generated charts, insights
```
*AI-powered query processing with instant visualization generation*

### 📊 Data Tables
```
[SCREENSHOT PLACEHOLDER: Data Exploration]
📍 Capture: http://localhost:3000 → Customers/Products/Orders sections
📝 Shows: Searchable tables, pagination, detailed data views
```
*Comprehensive data exploration with advanced filtering and search*

### 📚 API Documentation
```
[SCREENSHOT PLACEHOLDER: API Documentation]
📍 Capture: http://localhost:8000/docs
📝 Shows: Interactive FastAPI docs, endpoint testing, request/response examples
```
*Complete API documentation with try-it-out functionality*

## 🎥 **Live Demo Video**

<!-- Add your demo video here -->
```
[VIDEO PLACEHOLDER: Live Demo]
📹 Record: 2-3 minute walkthrough following ./create_visual_demo.sh guide
🎬 Upload to: YouTube, Vimeo, or GitHub releases
📝 Shows: Complete application workflow and features
```

**To add your video:**
```markdown
[![E-Commerce Analytics Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
```

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