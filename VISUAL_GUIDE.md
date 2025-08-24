# 📸 Visual Guide: E-Commerce Analytics Copilot

## 🌐 Live Website URLs
- **Main Dashboard:** http://localhost:3000
- **API Documentation:** http://localhost:8000/docs
- **Backend API:** http://localhost:8000

## 📱 Website Layout & Design

### 🎨 Overall Design
- **Theme:** Professional dark theme with blue accents
- **Layout:** Sidebar navigation + main content area
- **Colors:** Dark background (#0a0e27), blue primary (#2196f3), pink secondary (#ff4081)
- **Typography:** Roboto font family, clean and modern

### 🏠 Main Dashboard View (http://localhost:3000)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎯 E-Commerce Analytics Copilot                              [Live] Chip    │
├─────────────────────┬───────────────────────────────────────────────────────┤
│ SIDEBAR NAVIGATION  │                 MAIN CONTENT AREA                    │
│                     │                                                      │
│ 📊 Overview ●       │  METRICS CARDS (Row 1)                             │
│ 📈 Analytics        │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ 🤖 AI Query        │  │👥 1,000 │ │📦 500  │ │🛒 5,000 │ │💰$5.16M │    │
│ 👥 Customers       │  │Customer │ │Product │ │Orders  │ │Revenue  │    │
│ 📦 Products        │  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
│ 🛒 Orders          │                                                      │
│                     │  CHARTS GRID (Row 2)                               │
│                     │  ┌─────────────────────┐ ┌─────────────────────┐   │
│                     │  │   📈 Revenue Trend   │ │  📊 Top Products     │   │
│                     │  │                     │ │                     │   │
│                     │  │    /\      /\       │ │  ██████████████     │   │
│                     │  │   /  \    /  \      │ │  ████████████       │   │
│                     │  │  /    \  /    \     │ │  ██████████         │   │
│                     │  └─────────────────────┘ └─────────────────────┘   │
│                     │                                                      │
│                     │  ┌─────────────────────┐ ┌─────────────────────┐   │
│                     │  │ 🥧 Customer Segments│ │ 📊 Category Compare  │   │
│                     │  │                     │ │                     │   │
│                     │  │    ● Premium 33%    │ │  Electronics ████   │   │
│                     │  │    ● Standard 35%   │ │  Clothing   ███     │   │
│                     │  │    ● Basic 32%      │ │  Home&Garden██      │   │
│                     │  └─────────────────────┘ └─────────────────────┘   │
└─────────────────────┴───────────────────────────────────────────────────────┘
```

### 🤖 AI Query Interface

When you click "AI Query" in the sidebar:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         🤖 AI Analytics Query Interface                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  💬 Ask questions about your e-commerce data in natural language...       │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Ask anything about your data... e.g., 'Show me top products'      │   │
│  │                                                           [🔍 Ask AI] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  📋 Try These Sample Queries:                                             │
│  [📈 Show revenue trends] [🏆 Top products] [👥 Customer segments]        │
│  [📊 Category comparison] [📈 Monthly trends] [🛒 Order patterns]          │
│                                                                            │
│  ─────────────────── QUERY RESULTS ───────────────────                   │
│                                                                            │
│  💬 Q: "Show me the top 5 products by revenue"                           │
│  🧠 AI Interpretation: Analyzing products, revenue with ranking approach  │
│                                                                            │
│  📊 VISUALIZATION:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    Top Products by Revenue                          │   │
│  │                                                                     │   │
│  │  Product A  ██████████████████████████████████████████ $120,691    │   │
│  │  Product B  ████████████████████████████████████████   $117,034    │   │
│  │  Product C  ██████████████████████████████████████     $111,144    │   │
│  │  Product D  ████████████████████████████████████       $108,570    │   │
│  │  Product E  ███████████████████████████████████        $108,470    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  💡 KEY INSIGHTS:                                                         │
│  • Top product: Profit-focused disintermediate contingency ($120,690.73) │
│  • Revenue concentration: Top 5 products account for $565,909.45         │
│  • Average top product revenue: $113,181.89                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 📊 Data Tables View

When you click "Customers", "Products", or "Orders":

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  👥 Customers (1,000)                               [🔍 Search customers...] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Customer    │ Email              │ Phone         │ City      │ Segment│   │
│  ├─────────────┼────────────────────┼───────────────┼───────────┼────────┤   │
│  │ 👤 John Doe │ john@example.com   │ (555)123-4567 │ New York  │Premium │   │
│  │ 👤 Jane S.  │ jane@example.com   │ (555)987-6543 │ Los Angel │Standard│   │
│  │ 👤 Mike J.  │ mike@example.com   │ (555)456-7890 │ Chicago   │Basic   │   │
│  │ 👤 Sarah W. │ sarah@example.com  │ (555)234-5678 │ Houston   │Premium │   │
│  │ 👤 Tom B.   │ tom@example.com    │ (555)345-6789 │ Phoenix   │Standard│   │
│  └─────────────┴────────────────────┴───────────────┴───────────┴────────┘   │
│                                                                            │
│                              [< Previous]  Page 1 of 100  [Next >]        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 📚 API Documentation (http://localhost:8000/docs)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FastAPI - Interactive API Docs                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  🔧 E-Commerce Lakehouse LLM Analytics Copilot API                        │
│  📋 Version: 1.0.0                                                        │
│                                                                            │
│  📍 ENDPOINTS:                                                             │
│                                                                            │
│  ✅ GET  /health                    Health check endpoint                   │
│  📊 GET  /data/overview            Get data overview from lakehouse        │
│  🤖 POST /analytics/query          Process natural language query          │
│  📈 GET  /analytics/dashboard      Get dashboard analytics data            │
│  👥 GET  /data/customers           Get customer data (paginated)           │
│  📦 GET  /data/products            Get product data (paginated)            │
│  🛒 GET  /data/orders              Get order data (paginated)              │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🤖 POST /analytics/query                              [Try it out] │   │
│  │                                                                     │   │
│  │ Request Body:                                                       │   │
│  │ {                                                                   │   │
│  │   "query": "Show me revenue trends",                               │   │
│  │   "context": {}                                                     │   │
│  │ }                                                        [Execute] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🎨 Visual Design Elements

### Color Scheme
- **Background:** Deep blue (#0a0e27)
- **Cards:** Gradient blue (#1a1d3a to #2d3561)
- **Primary:** Bright blue (#2196f3)
- **Secondary:** Pink accent (#ff4081)
- **Success:** Green (#4caf50)
- **Warning:** Orange (#ff9800)
- **Error:** Red (#f44336)

### UI Components
- **Metrics Cards:** Floating cards with icons, values, and hover effects
- **Charts:** Interactive Recharts with tooltips and legends
- **Tables:** Material-UI tables with search, sort, and pagination
- **Buttons:** Rounded corners, smooth transitions
- **Typography:** Clean, readable fonts with proper hierarchy

### Responsive Features
- **Mobile-friendly:** Sidebar collapses to hamburger menu
- **Tablet-optimized:** Charts resize dynamically
- **Desktop-enhanced:** Full sidebar navigation visible

## 🎬 Recording Tips

### Best Views to Capture
1. **Full Dashboard:** Show overview with all metrics and charts
2. **AI Query Demo:** Type query and show chart generation
3. **Table Interaction:** Search, filter, and paginate through data
4. **API Testing:** Use FastAPI docs to test endpoints

### Recommended Screen Resolution
- **Desktop:** 1920x1080 (16:9) for best chart visibility
- **Aspect Ratio:** 16:9 for video content
- **Zoom Level:** 100% browser zoom for clear text

This visual guide shows exactly what your application looks like when running!