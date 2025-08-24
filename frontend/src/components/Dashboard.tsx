import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Paper,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AnalyticsCharts from './AnalyticsCharts';
import QueryInterface from './QueryInterface';
import DataTables from './DataTables';
import MetricsCards from './MetricsCards';

const API_BASE_URL = 'http://localhost:8000';

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch overview data
  const { data: overviewData, isLoading: overviewLoading } = useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/data/overview`);
      return response.data;
    },
  });

  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/analytics/dashboard`);
      return response.data;
    },
  });

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <DashboardIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
    { id: 'query', label: 'AI Query', icon: <SearchIcon /> },
    { id: 'customers', label: 'Customers', icon: <PeopleIcon /> },
    { id: 'products', label: 'Products', icon: <InventoryIcon /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCartIcon /> },
  ];

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    setDrawerOpen(false);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MetricsCards data={overviewData} loading={overviewLoading} />
            </Grid>
            <Grid item xs={12}>
              <AnalyticsCharts data={dashboardData} loading={dashboardLoading} />
            </Grid>
          </Grid>
        );
      case 'analytics':
        return <AnalyticsCharts data={dashboardData} loading={dashboardLoading} detailed />;
      case 'query':
        return <QueryInterface />;
      case 'customers':
        return <DataTables type="customers" />;
      case 'products':
        return <DataTables type="products" />;
      case 'orders':
        return <DataTables type="orders" />;
      default:
        return <Typography>Select a section from the menu</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <TrendingUpIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Commerce Analytics Copilot
          </Typography>
          <Chip
            label="Live"
            color="success"
            size="small"
            sx={{ ml: 2 }}
          />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              sx={{
                cursor: 'pointer',
                backgroundColor: selectedTab === item.id ? 'primary.main' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedTab === item.id ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedTab === item.id ? 'white' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ color: selectedTab === item.id ? 'white' : 'inherit' }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            position: 'relative',
            height: '100vh',
          },
        }}
        open
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              sx={{
                cursor: 'pointer',
                backgroundColor: selectedTab === item.id ? 'primary.main' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedTab === item.id ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedTab === item.id ? 'white' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ color: selectedTab === item.id ? 'white' : 'inherit' }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
        }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;