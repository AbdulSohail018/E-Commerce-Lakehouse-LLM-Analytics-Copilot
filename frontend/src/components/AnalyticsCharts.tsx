import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  revenue_trend: any;
  top_products: any;
  category_comparison: any;
  customer_segments: any;
}

interface AnalyticsChartsProps {
  data: ChartData | undefined;
  loading: boolean;
  detailed?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data, loading, detailed = false }) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((index) => (
          <Grid item xs={12} md={detailed ? 12 : 6} key={index}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width={200} height={30} />
                <Skeleton variant="rectangular" width="100%" height={300} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent>
          <Typography>No analytics data available</Typography>
        </CardContent>
      </Card>
    );
  }

  const formatRevenueTrendData = () => {
    if (!data.revenue_trend?.data) return [];
    const { labels, revenue, orders } = data.revenue_trend.data;
    return labels.map((label: string, index: number) => ({
      month: label,
      revenue: revenue[index],
      orders: orders[index],
    }));
  };

  const formatTopProductsData = () => {
    if (!data.top_products?.data) return [];
    const { labels, values } = data.top_products.data;
    return labels.map((label: string, index: number) => ({
      name: label.length > 20 ? label.substring(0, 20) + '...' : label,
      value: values[index],
    }));
  };

  const formatCategoryData = () => {
    if (!data.category_comparison?.data) return [];
    const { labels, revenue } = data.category_comparison.data;
    return labels.map((label: string, index: number) => ({
      category: label,
      revenue: revenue[index],
    }));
  };

  const formatCustomerSegmentData = () => {
    if (!data.customer_segments?.data) return [];
    const { labels, values } = data.customer_segments.data;
    return labels.map((label: string, index: number) => ({
      name: label,
      value: values[index],
    }));
  };

  const revenueTrendData = formatRevenueTrendData();
  const topProductsData = formatTopProductsData();
  const categoryData = formatCategoryData();
  const customerSegmentData = formatCustomerSegmentData();

  return (
    <Grid container spacing={3}>
      {/* Revenue Trend */}
      <Grid item xs={12} md={detailed ? 12 : 6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Revenue Trend Over Time
            </Typography>
            <Box sx={{ width: '100%', height: detailed ? 400 : 300 }}>
              <ResponsiveContainer>
                <LineChart data={revenueTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={[
                      (value: number) => [`$${value.toLocaleString()}`, 'Revenue'],
                      (value: number) => [value.toLocaleString(), 'Orders'],
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                {data.revenue_trend?.insights?.map((insight: string, index: number) => (
                  <div key={index}>• {insight}</div>
                ))}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Top Products */}
      <Grid item xs={12} md={detailed ? 12 : 6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Top Products by Revenue
            </Typography>
            <Box sx={{ width: '100%', height: detailed ? 400 : 300 }}>
              <ResponsiveContainer>
                <BarChart data={topProductsData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                {data.top_products?.insights?.map((insight: string, index: number) => (
                  <div key={index}>• {insight}</div>
                ))}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Category Comparison */}
      <Grid item xs={12} md={detailed ? 6 : 12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Category Performance
            </Typography>
            <Box sx={{ width: '100%', height: detailed ? 400 : 300 }}>
              <ResponsiveContainer>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                {data.category_comparison?.insights?.map((insight: string, index: number) => (
                  <div key={index}>• {insight}</div>
                ))}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Customer Segments */}
      <Grid item xs={12} md={detailed ? 6 : 12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Customer Segments
            </Typography>
            <Box sx={{ width: '100%', height: detailed ? 400 : 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={customerSegmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                {data.customer_segments?.insights?.map((insight: string, index: number) => (
                  <div key={index}>• {insight}</div>
                ))}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCharts;