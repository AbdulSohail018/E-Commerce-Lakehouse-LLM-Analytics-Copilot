#!/bin/bash

echo "📸 Creating Demo Screenshots and Documentation"
echo "=============================================="

# Create screenshots directory
mkdir -p /workspace/screenshots

# Create a demo data file showing the UI components
cat > /workspace/screenshots/ui_demo.md << 'EOF'
# E-Commerce Analytics Copilot - Visual Demo

## Dashboard Overview
The main dashboard features a modern dark theme with:
- Real-time metrics cards showing key KPIs
- Interactive charts and visualizations
- Sidebar navigation for different sections
- Professional Material-UI components

## Key UI Components:

### 1. Metrics Cards
- Total Customers: 1,000
- Total Products: 500
- Total Orders: 5,000
- Total Revenue: $5,162,213.71
- Average Order Value: $1,032.44

### 2. Interactive Charts
- Revenue Trend Line Chart
- Top Products Bar Chart
- Category Performance Comparison
- Customer Segment Pie Chart

### 3. AI Query Interface
- Natural language input field
- Suggested query chips
- Real-time visualization generation
- Insight extraction and display

### 4. Data Tables
- Paginated customer, product, and order tables
- Search functionality
- Sortable columns
- Detailed data views

## Sample Queries Supported:
- "Show me revenue trends over time"
- "Which are the top products by sales?"
- "How are customer segments distributed?"
- "Compare sales across categories"
EOF

echo "✅ Demo documentation created in screenshots/ui_demo.md"

# Create ASCII art representation of the UI
cat > /workspace/screenshots/ascii_ui.txt << 'EOF'
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
EOF

echo "✅ ASCII UI representation created"

# Create a sample API response documentation
cat > /workspace/screenshots/api_demo.json << 'EOF'
{
  "sample_query": "Show me the top 5 products by revenue",
  "response": {
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
    "visualization_type": "bar",
    "query_interpretation": "Analyzing products, revenue with ranking approach"
  }
}
EOF

echo "✅ API demo response created"

echo ""
echo "📁 Demo files created:"
echo "   📸 screenshots/ui_demo.md - UI component documentation"
echo "   🎨 screenshots/ascii_ui.txt - ASCII representation"
echo "   📊 screenshots/api_demo.json - Sample API response"
echo ""
echo "✅ Ready to add to README!"