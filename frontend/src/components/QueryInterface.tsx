import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Paper,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  Send as SendIcon,
  AutoAwesome as AutoAwesomeIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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

const API_BASE_URL = 'http://localhost:8000';

interface QueryResult {
  data: any;
  insights: string[];
  visualization_type: string;
  query_interpretation: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const QueryInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [queryHistory, setQueryHistory] = useState<Array<{ query: string; result: QueryResult }>>([]);

  const suggestedQueries = [
    "Show me the revenue trend over the last year",
    "Which are the top 10 products by sales?",
    "How are different product categories performing?",
    "What's the distribution of customer segments?",
    "Compare sales between different product categories",
    "Show me monthly order trends",
    "Which customers are buying the most?",
    "What's the average order value trend?",
  ];

  const queryMutation = useMutation({
    mutationFn: async (queryText: string) => {
      const response = await axios.post(`${API_BASE_URL}/analytics/query`, {
        query: queryText,
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      setQueryHistory(prev => [...prev, { query: variables, result: data }]);
      setQuery('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      queryMutation.mutate(query);
    }
  };

  const handleSuggestedQuery = (suggestedQuery: string) => {
    setQuery(suggestedQuery);
  };

  const renderVisualization = (result: QueryResult) => {
    const { data, visualization_type } = result;

    if (!data || Object.keys(data).length === 0) {
      return (
        <Alert severity="info">
          No visualization data available for this query.
        </Alert>
      );
    }

    switch (visualization_type) {
      case 'line':
        if (data.labels && data.revenue) {
          const chartData = data.labels.map((label: string, index: number) => ({
            month: label,
            revenue: data.revenue[index],
            orders: data.orders ? data.orders[index] : null,
          }));
          return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          );
        }
        break;

      case 'bar':
        if (data.labels && data.values) {
          const chartData = data.labels.map((label: string, index: number) => ({
            name: label.length > 15 ? label.substring(0, 15) + '...' : label,
            value: data.values[index],
          }));
          return (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Value']} />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          );
        }
        break;

      case 'pie':
        if (data.labels && data.values) {
          const chartData = data.labels.map((label: string, index: number) => ({
            name: label,
            value: data.values[index],
          }));
          return (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          );
        }
        break;

      case 'metrics':
        if (data.metrics) {
          return (
            <Grid container spacing={2}>
              {Object.entries(data.metrics).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {typeof value === 'number' && key.includes('revenue') 
                        ? `$${(value as number).toLocaleString()}`
                        : (value as number).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          );
        }
        break;

      default:
        return (
          <Alert severity="warning">
            Unsupported visualization type: {visualization_type}
          </Alert>
        );
    }

    return (
      <Alert severity="error">
        Unable to render visualization. Data format may be incompatible.
      </Alert>
    );
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Query Input */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AutoAwesomeIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  AI Analytics Query Interface
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Ask questions about your e-commerce data in natural language. The AI will analyze your data and provide insights with visualizations.
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about your e-commerce data... e.g., 'Show me the top performing products this month' or 'How is customer growth trending?'"
                  variant="outlined"
                  disabled={queryMutation.isPending}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={queryMutation.isPending ? <CircularProgress size={20} /> : <SendIcon />}
                  disabled={!query.trim() || queryMutation.isPending}
                  size="large"
                >
                  {queryMutation.isPending ? 'Analyzing...' : 'Ask AI'}
                </Button>
              </form>

              {queryMutation.isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Failed to process query. Please try again.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Suggested Queries */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Try These Sample Queries
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {suggestedQueries.map((suggestedQuery, index) => (
                  <Chip
                    key={index}
                    label={suggestedQuery}
                    onClick={() => handleSuggestedQuery(suggestedQuery)}
                    variant="outlined"
                    clickable
                    icon={<TrendingUpIcon />}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Query Results */}
        {queryHistory.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Query Results
            </Typography>
            {queryHistory.slice().reverse().map((item, index) => (
              <Card key={index} sx={{ mb: 3 }}>
                <CardContent>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                      Q: {item.query}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {item.result.query_interpretation}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {/* Visualization */}
                  <Box mb={3}>
                    {renderVisualization(item.result)}
                  </Box>
                  
                  {/* Insights */}
                  {item.result.insights && item.result.insights.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Key Insights:
                      </Typography>
                      {item.result.insights.map((insight, insightIndex) => (
                        <Typography
                          key={insightIndex}
                          variant="body2"
                          sx={{ mb: 0.5, pl: 2 }}
                        >
                          • {insight}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default QueryInterface;