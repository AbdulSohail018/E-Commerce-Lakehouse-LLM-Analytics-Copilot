import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Skeleton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

interface DataTablesProps {
  type: 'customers' | 'products' | 'orders';
}

const DataTables: React.FC<DataTablesProps> = ({ type }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: [type, page, rowsPerPage],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/data/${type}`, {
        params: {
          limit: rowsPerPage,
          offset: page * rowsPerPage,
        },
      });
      return response.data;
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'active':
        return 'success';
      case 'pending':
      case 'processing':
        return 'warning';
      case 'cancelled':
      case 'inactive':
        return 'error';
      case 'shipped':
        return 'info';
      default:
        return 'default';
    }
  };

  const renderTableHeaders = () => {
    switch (type) {
      case 'customers':
        return (
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Segment</TableCell>
            <TableCell>Lifetime Value</TableCell>
          </TableRow>
        );
      case 'products':
        return (
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        );
      case 'orders':
        return (
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Channel</TableCell>
          </TableRow>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    if (!data?.data) return null;

    const filteredData = data.data.filter((item: any) => {
      const searchLower = searchTerm.toLowerCase();
      switch (type) {
        case 'customers':
          return (
            item.first_name?.toLowerCase().includes(searchLower) ||
            item.last_name?.toLowerCase().includes(searchLower) ||
            item.email?.toLowerCase().includes(searchLower)
          );
        case 'products':
          return (
            item.product_name?.toLowerCase().includes(searchLower) ||
            item.brand?.toLowerCase().includes(searchLower) ||
            item.category?.toLowerCase().includes(searchLower)
          );
        case 'orders':
          return (
            item.order_id?.toLowerCase().includes(searchLower) ||
            item.customer_id?.toLowerCase().includes(searchLower)
          );
        default:
          return true;
      }
    });

    return filteredData.map((item: any, index: number) => {
      switch (type) {
        case 'customers':
          return (
            <TableRow key={index} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {item.first_name} {item.last_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.customer_id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell>
                <Chip
                  label={item.customer_segment}
                  size="small"
                  color={item.customer_segment === 'Premium' ? 'primary' : 'default'}
                />
              </TableCell>
              <TableCell>${item.lifetime_value?.toFixed(2)}</TableCell>
            </TableRow>
          );
        case 'products':
          return (
            <TableRow key={index} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                    <InventoryIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {item.product_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.product_id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>${item.price?.toFixed(2)}</TableCell>
              <TableCell>
                <Chip
                  label={item.stock_quantity}
                  size="small"
                  color={item.stock_quantity > 100 ? 'success' : item.stock_quantity > 10 ? 'warning' : 'error'}
                />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">
                    {item.rating}/5.0
                  </Typography>
                  <Typography variant="caption" color="text.secondary" ml={1}>
                    ({item.reviews_count} reviews)
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          );
        case 'orders':
          return (
            <TableRow key={index} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ mr: 2, bgcolor: 'warning.main' }}>
                    <ShoppingCartIcon />
                  </Avatar>
                  <Typography variant="body2" fontWeight="bold">
                    {item.order_id}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{item.customer_id}</TableCell>
              <TableCell>
                {new Date(item.order_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Chip
                  label={item.order_status}
                  size="small"
                  color={getStatusColor(item.order_status) as any}
                />
              </TableCell>
              <TableCell>${item.total_amount?.toFixed(2)}</TableCell>
              <TableCell>
                <Chip label={item.channel} size="small" variant="outlined" />
              </TableCell>
            </TableRow>
          );
        default:
          return null;
      }
    });
  };

  const getTitle = () => {
    switch (type) {
      case 'customers':
        return 'Customers';
      case 'products':
        return 'Products';
      case 'orders':
        return 'Orders';
      default:
        return 'Data';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {getTitle()}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                {renderTableHeaders()}
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(6)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="error">
            Error loading {type} data
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">
            {getTitle()} ({data?.total?.toLocaleString() || 0})
          </Typography>
          <TextField
            size="small"
            placeholder={`Search ${type}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Box>
        
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              {renderTableHeaders()}
            </TableHead>
            <TableBody>
              {renderTableRows()}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={data?.total || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default DataTables;