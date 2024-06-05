import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, Grid, Box } from '@mui/material';

const products = [
  { id: 1, name: 'Original Thissamaharama Home Made Curd', price: 40, quantity: 1, image: 'curd-image-url' },
  { id: 2, name: 'Home made Fresh Milk 750ml', price: 30, quantity: 1, image: 'milk-image-url' },
];

const users = [
  { id: 1, role: 'Seller', name: 'Hitha Hoda Mikiri', image: 'seller-image-url' },
  { id: 2, role: 'Customer', name: 'John Doe', image: 'customer-image-url' },
];

const AdminDashboard = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Welcome to Admin Dashboard</Typography>

      <Box mb={4}>
        <Typography variant="h6" component="h2" gutterBottom>Product ({products.length})</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Sub-total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Avatar alt={product.name} src={product.image} />
                      </Grid>
                      <Grid item>
                        {product.name}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.price * product.quantity}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="success" size="small">Approve</Button>
                    <Button variant="outlined" color="error" size="small" sx={{ ml: 1 }}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography variant="h6" component="h2" gutterBottom>User ({users.length})</Typography>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} md={6} key={user.id}>
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar alt={user.name} src={user.image} sx={{ mr: 2 }} />
                <Box flexGrow={1}>
                  <Typography variant="body1">{user.role}</Typography>
                  <Typography variant="body2">{user.name}</Typography>
                </Box>
                <Button variant="outlined" color="error" size="small">Reject</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
