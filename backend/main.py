from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import numpy as np
import json
import asyncio
from datetime import datetime, timedelta
import random
from typing import List, Dict, Any, Optional
import os
from faker import Faker

app = FastAPI(title="E-Commerce Lakehouse LLM Analytics Copilot", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Faker for synthetic data
fake = Faker()

# Data models
class QueryRequest(BaseModel):
    query: str
    context: Optional[Dict[str, Any]] = None

class AnalyticsResponse(BaseModel):
    data: Dict[str, Any]
    insights: List[str]
    visualization_type: str
    query_interpretation: str

# In-memory data store (simulating lakehouse)
class DataLakehouse:
    def __init__(self):
        self.customers = self._generate_customers(1000)
        self.products = self._generate_products(500)
        self.orders = self._generate_orders(5000)
        self.order_items = self._generate_order_items()
        
    def _generate_customers(self, count: int) -> pd.DataFrame:
        customers = []
        for i in range(count):
            customers.append({
                'customer_id': f'CUST_{i+1:06d}',
                'first_name': fake.first_name(),
                'last_name': fake.last_name(),
                'email': fake.email(),
                'phone': fake.phone_number(),
                'address': fake.address(),
                'city': fake.city(),
                'state': fake.state(),
                'country': fake.country(),
                'postal_code': fake.postcode(),
                'registration_date': fake.date_between(start_date='-2y', end_date='today'),
                'age': random.randint(18, 80),
                'gender': random.choice(['M', 'F', 'Other']),
                'customer_segment': random.choice(['Premium', 'Standard', 'Basic']),
                'lifetime_value': round(random.uniform(100, 10000), 2)
            })
        return pd.DataFrame(customers)
    
    def _generate_products(self, count: int) -> pd.DataFrame:
        categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Toys']
        products = []
        for i in range(count):
            category = random.choice(categories)
            products.append({
                'product_id': f'PROD_{i+1:06d}',
                'product_name': fake.catch_phrase(),
                'category': category,
                'subcategory': f'{category} Subcategory {random.randint(1, 5)}',
                'brand': fake.company(),
                'price': round(random.uniform(10, 1000), 2),
                'cost': round(random.uniform(5, 500), 2),
                'weight': round(random.uniform(0.1, 50), 2),
                'dimensions': f'{random.randint(5, 50)}x{random.randint(5, 50)}x{random.randint(5, 50)}',
                'color': fake.color_name(),
                'size': random.choice(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']),
                'stock_quantity': random.randint(0, 1000),
                'supplier_id': f'SUPP_{random.randint(1, 100):03d}',
                'rating': round(random.uniform(1, 5), 1),
                'reviews_count': random.randint(0, 1000)
            })
        return pd.DataFrame(products)
    
    def _generate_orders(self, count: int) -> pd.DataFrame:
        orders = []
        for i in range(count):
            order_date = fake.date_time_between(start_date='-1y', end_date='now')
            orders.append({
                'order_id': f'ORD_{i+1:08d}',
                'customer_id': f'CUST_{random.randint(1, 1000):06d}',
                'order_date': order_date,
                'order_status': random.choice(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
                'payment_method': random.choice(['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer']),
                'shipping_method': random.choice(['Standard', 'Express', 'Next Day', 'International']),
                'shipping_cost': round(random.uniform(5, 50), 2),
                'tax_amount': round(random.uniform(10, 200), 2),
                'discount_amount': round(random.uniform(0, 100), 2),
                'total_amount': round(random.uniform(50, 2000), 2),
                'shipping_address': fake.address(),
                'billing_address': fake.address(),
                'currency': 'USD',
                'channel': random.choice(['Website', 'Mobile App', 'Phone', 'Store'])
            })
        return pd.DataFrame(orders)
    
    def _generate_order_items(self) -> pd.DataFrame:
        order_items = []
        for _, order in self.orders.iterrows():
            num_items = random.randint(1, 5)
            for j in range(num_items):
                product = self.products.sample(1).iloc[0]
                quantity = random.randint(1, 5)
                unit_price = product['price'] * random.uniform(0.8, 1.2)  # Some price variation
                order_items.append({
                    'order_item_id': f'OI_{len(order_items)+1:08d}',
                    'order_id': order['order_id'],
                    'product_id': product['product_id'],
                    'quantity': quantity,
                    'unit_price': round(unit_price, 2),
                    'total_price': round(unit_price * quantity, 2),
                    'discount_percentage': round(random.uniform(0, 20), 1)
                })
        return pd.DataFrame(order_items)

# Initialize data lakehouse
lakehouse = DataLakehouse()

class LLMAnalytics:
    def __init__(self):
        self.lakehouse = lakehouse
    
    def parse_natural_language_query(self, query: str) -> Dict[str, Any]:
        """Parse natural language query and determine analytics approach"""
        query_lower = query.lower()
        
        # Determine query type and relevant data
        analysis_type = "general"
        data_scope = []
        time_filter = None
        group_by = []
        metrics = []
        
        # Keywords for different analysis types
        if any(word in query_lower for word in ['trend', 'over time', 'monthly', 'daily', 'weekly']):
            analysis_type = "time_series"
        elif any(word in query_lower for word in ['top', 'best', 'highest', 'lowest', 'ranking']):
            analysis_type = "ranking"
        elif any(word in query_lower for word in ['compare', 'comparison', 'vs', 'versus']):
            analysis_type = "comparison"
        elif any(word in query_lower for word in ['distribution', 'breakdown', 'segment']):
            analysis_type = "distribution"
        
        # Determine data scope
        if any(word in query_lower for word in ['customer', 'user', 'buyer']):
            data_scope.append('customers')
        if any(word in query_lower for word in ['product', 'item', 'merchandise']):
            data_scope.append('products')
        if any(word in query_lower for word in ['order', 'purchase', 'sale', 'transaction']):
            data_scope.append('orders')
        if any(word in query_lower for word in ['revenue', 'sales', 'income']):
            data_scope.append('revenue')
        
        # Default to orders if no specific scope detected
        if not data_scope:
            data_scope = ['orders']
        
        return {
            'analysis_type': analysis_type,
            'data_scope': data_scope,
            'original_query': query,
            'interpretation': f"Analyzing {', '.join(data_scope)} with {analysis_type} approach"
        }
    
    def execute_analytics_query(self, parsed_query: Dict[str, Any]) -> Dict[str, Any]:
        """Execute analytics based on parsed query"""
        analysis_type = parsed_query['analysis_type']
        data_scope = parsed_query['data_scope']
        
        result = {
            'data': {},
            'insights': [],
            'visualization_type': 'bar',
            'query_interpretation': parsed_query['interpretation']
        }
        
        try:
            if analysis_type == "time_series":
                result.update(self._time_series_analysis(data_scope))
            elif analysis_type == "ranking":
                result.update(self._ranking_analysis(data_scope))
            elif analysis_type == "comparison":
                result.update(self._comparison_analysis(data_scope))
            elif analysis_type == "distribution":
                result.update(self._distribution_analysis(data_scope))
            else:
                result.update(self._general_analysis(data_scope))
                
        except Exception as e:
            result['insights'] = [f"Error processing query: {str(e)}"]
            result['data'] = {'error': str(e)}
        
        return result
    
    def _time_series_analysis(self, data_scope: List[str]) -> Dict[str, Any]:
        """Perform time series analysis"""
        orders_with_items = self.lakehouse.orders.merge(
            self.lakehouse.order_items.groupby('order_id')['total_price'].sum().reset_index(),
            on='order_id'
        )
        
        # Monthly revenue trend
        orders_with_items['order_date'] = pd.to_datetime(orders_with_items['order_date'])
        monthly_data = orders_with_items.groupby(orders_with_items['order_date'].dt.to_period('M')).agg({
            'total_amount': 'sum',
            'order_id': 'count'
        }).reset_index()
        
        monthly_data['month'] = monthly_data['order_date'].astype(str)
        
        return {
            'data': {
                'labels': monthly_data['month'].tolist(),
                'revenue': monthly_data['total_amount'].tolist(),
                'orders': monthly_data['order_id'].tolist()
            },
            'visualization_type': 'line',
            'insights': [
                f"Peak revenue month: {monthly_data.loc[monthly_data['total_amount'].idxmax(), 'month']}",
                f"Average monthly revenue: ${monthly_data['total_amount'].mean():,.2f}",
                f"Total orders analyzed: {monthly_data['order_id'].sum():,}"
            ]
        }
    
    def _ranking_analysis(self, data_scope: List[str]) -> Dict[str, Any]:
        """Perform ranking analysis"""
        if 'products' in data_scope:
            # Top products by revenue
            product_revenue = self.lakehouse.order_items.merge(
                self.lakehouse.products, on='product_id'
            ).groupby(['product_id', 'product_name'])['total_price'].sum().reset_index()
            
            top_products = product_revenue.nlargest(10, 'total_price')
            
            return {
                'data': {
                    'labels': top_products['product_name'].tolist(),
                    'values': top_products['total_price'].tolist()
                },
                'visualization_type': 'bar',
                'insights': [
                    f"Top product: {top_products.iloc[0]['product_name']} (${top_products.iloc[0]['total_price']:,.2f})",
                    f"Revenue concentration: Top 10 products account for ${top_products['total_price'].sum():,.2f}",
                    f"Average top product revenue: ${top_products['total_price'].mean():,.2f}"
                ]
            }
        else:
            # Top customers by order value
            customer_revenue = self.lakehouse.orders.merge(
                self.lakehouse.customers, on='customer_id'
            ).groupby(['customer_id', 'first_name', 'last_name'])['total_amount'].sum().reset_index()
            
            top_customers = customer_revenue.nlargest(10, 'total_amount')
            top_customers['name'] = top_customers['first_name'] + ' ' + top_customers['last_name']
            
            return {
                'data': {
                    'labels': top_customers['name'].tolist(),
                    'values': top_customers['total_amount'].tolist()
                },
                'visualization_type': 'bar',
                'insights': [
                    f"Top customer: {top_customers.iloc[0]['name']} (${top_customers.iloc[0]['total_amount']:,.2f})",
                    f"Customer concentration: Top 10 customers spent ${top_customers['total_amount'].sum():,.2f}",
                    f"Average top customer value: ${top_customers['total_amount'].mean():,.2f}"
                ]
            }
    
    def _comparison_analysis(self, data_scope: List[str]) -> Dict[str, Any]:
        """Perform comparison analysis"""
        # Compare categories
        category_data = self.lakehouse.order_items.merge(
            self.lakehouse.products, on='product_id'
        ).groupby('category').agg({
            'total_price': 'sum',
            'quantity': 'sum'
        }).reset_index()
        
        return {
            'data': {
                'labels': category_data['category'].tolist(),
                'revenue': category_data['total_price'].tolist(),
                'quantity': category_data['quantity'].tolist()
            },
            'visualization_type': 'bar',
            'insights': [
                f"Leading category by revenue: {category_data.loc[category_data['total_price'].idxmax(), 'category']}",
                f"Leading category by volume: {category_data.loc[category_data['quantity'].idxmax(), 'category']}",
                f"Total categories: {len(category_data)}"
            ]
        }
    
    def _distribution_analysis(self, data_scope: List[str]) -> Dict[str, Any]:
        """Perform distribution analysis"""
        if 'customers' in data_scope:
            # Customer segment distribution
            segment_dist = self.lakehouse.customers['customer_segment'].value_counts()
            
            return {
                'data': {
                    'labels': segment_dist.index.tolist(),
                    'values': segment_dist.values.tolist()
                },
                'visualization_type': 'pie',
                'insights': [
                    f"Largest segment: {segment_dist.index[0]} ({segment_dist.iloc[0]} customers)",
                    f"Segment diversity: {len(segment_dist)} segments",
                    f"Total customers: {segment_dist.sum():,}"
                ]
            }
        else:
            # Order status distribution
            status_dist = self.lakehouse.orders['order_status'].value_counts()
            
            return {
                'data': {
                    'labels': status_dist.index.tolist(),
                    'values': status_dist.values.tolist()
                },
                'visualization_type': 'pie',
                'insights': [
                    f"Most common status: {status_dist.index[0]} ({status_dist.iloc[0]} orders)",
                    f"Status variety: {len(status_dist)} different statuses",
                    f"Total orders: {status_dist.sum():,}"
                ]
            }
    
    def _general_analysis(self, data_scope: List[str]) -> Dict[str, Any]:
        """Perform general analysis"""
        # General overview metrics
        total_customers = len(self.lakehouse.customers)
        total_products = len(self.lakehouse.products)
        total_orders = len(self.lakehouse.orders)
        total_revenue = self.lakehouse.orders['total_amount'].sum()
        avg_order_value = self.lakehouse.orders['total_amount'].mean()
        
        return {
            'data': {
                'metrics': {
                    'total_customers': total_customers,
                    'total_products': total_products,
                    'total_orders': total_orders,
                    'total_revenue': total_revenue,
                    'avg_order_value': avg_order_value
                }
            },
            'visualization_type': 'metrics',
            'insights': [
                f"Total customers: {total_customers:,}",
                f"Total products: {total_products:,}",
                f"Total orders: {total_orders:,}",
                f"Total revenue: ${total_revenue:,.2f}",
                f"Average order value: ${avg_order_value:.2f}"
            ]
        }

# Initialize LLM Analytics
llm_analytics = LLMAnalytics()

@app.get("/")
async def root():
    return {"message": "E-Commerce Lakehouse LLM Analytics Copilot API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.get("/data/overview")
async def data_overview():
    """Get data overview from the lakehouse"""
    return {
        "customers": len(lakehouse.customers),
        "products": len(lakehouse.products),
        "orders": len(lakehouse.orders),
        "order_items": len(lakehouse.order_items),
        "total_revenue": lakehouse.orders['total_amount'].sum(),
        "avg_order_value": lakehouse.orders['total_amount'].mean(),
        "date_range": {
            "start": lakehouse.orders['order_date'].min().isoformat(),
            "end": lakehouse.orders['order_date'].max().isoformat()
        }
    }

@app.post("/analytics/query")
async def analytics_query(request: QueryRequest):
    """Process natural language analytics query"""
    try:
        # Parse the natural language query
        parsed_query = llm_analytics.parse_natural_language_query(request.query)
        
        # Execute analytics
        result = llm_analytics.execute_analytics_query(parsed_query)
        
        return AnalyticsResponse(**result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/dashboard")
async def dashboard_data():
    """Get dashboard data"""
    try:
        # Revenue trend
        revenue_trend = llm_analytics.execute_analytics_query({
            'analysis_type': 'time_series',
            'data_scope': ['revenue'],
            'interpretation': 'Revenue trend analysis'
        })
        
        # Top products
        top_products = llm_analytics.execute_analytics_query({
            'analysis_type': 'ranking',
            'data_scope': ['products'],
            'interpretation': 'Top products analysis'
        })
        
        # Category comparison
        category_comparison = llm_analytics.execute_analytics_query({
            'analysis_type': 'comparison',
            'data_scope': ['products'],
            'interpretation': 'Category comparison analysis'
        })
        
        # Customer segments
        customer_segments = llm_analytics.execute_analytics_query({
            'analysis_type': 'distribution',
            'data_scope': ['customers'],
            'interpretation': 'Customer segment distribution'
        })
        
        return {
            "revenue_trend": revenue_trend,
            "top_products": top_products,
            "category_comparison": category_comparison,
            "customer_segments": customer_segments
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/data/customers")
async def get_customers(limit: int = 100, offset: int = 0):
    """Get customer data"""
    customers_page = lakehouse.customers.iloc[offset:offset+limit]
    return {
        "data": customers_page.to_dict('records'),
        "total": len(lakehouse.customers),
        "limit": limit,
        "offset": offset
    }

@app.get("/data/products")
async def get_products(limit: int = 100, offset: int = 0):
    """Get product data"""
    products_page = lakehouse.products.iloc[offset:offset+limit]
    return {
        "data": products_page.to_dict('records'),
        "total": len(lakehouse.products),
        "limit": limit,
        "offset": offset
    }

@app.get("/data/orders")
async def get_orders(limit: int = 100, offset: int = 0):
    """Get order data"""
    orders_page = lakehouse.orders.iloc[offset:offset+limit]
    # Convert datetime to string for JSON serialization
    orders_data = orders_page.copy()
    orders_data['order_date'] = orders_data['order_date'].astype(str)
    return {
        "data": orders_data.to_dict('records'),
        "total": len(lakehouse.orders),
        "limit": limit,
        "offset": offset
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)