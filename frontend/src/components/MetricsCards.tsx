import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Avatar,
} from '@mui/material';
import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

interface MetricsData {
  customers: number;
  products: number;
  orders: number;
  total_revenue: number;
  avg_order_value: number;
}

interface MetricsCardsProps {
  data: MetricsData | undefined;
  loading: boolean;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ data, loading }) => {
  const metrics = [
    {
      title: 'Total Customers',
      value: data?.customers,
      icon: <PeopleIcon />,
      color: '#2196f3',
      format: (val: number) => val.toLocaleString(),
    },
    {
      title: 'Total Products',
      value: data?.products,
      icon: <InventoryIcon />,
      color: '#4caf50',
      format: (val: number) => val.toLocaleString(),
    },
    {
      title: 'Total Orders',
      value: data?.orders,
      icon: <ShoppingCartIcon />,
      color: '#ff9800',
      format: (val: number) => val.toLocaleString(),
    },
    {
      title: 'Total Revenue',
      value: data?.total_revenue,
      icon: <AttachMoneyIcon />,
      color: '#9c27b0',
      format: (val: number) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      title: 'Avg Order Value',
      value: data?.avg_order_value,
      icon: <TrendingUpIcon />,
      color: '#f44336',
      format: (val: number) => `$${val.toFixed(2)}`,
    },
  ];

  if (loading) {
    return (
      <Grid container spacing={3}>
        {metrics.map((_, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={80} height={40} />
                  </Box>
                  <Skeleton variant="circular" width={48} height={48} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}>
          <Card
            sx={{
              height: '100%',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontSize: '0.875rem', fontWeight: 500 }}
                  >
                    {metric.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 600, color: metric.color }}
                  >
                    {metric.value ? metric.format(metric.value) : '0'}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: metric.color,
                    width: 48,
                    height: 48,
                  }}
                >
                  {metric.icon}
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsCards;