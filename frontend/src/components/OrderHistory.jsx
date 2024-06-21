// OrderHistory.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const OrderHistory = () => {
  const orders = [
    { id: '#96459761', status: 'IN PROGRESS', date: 'Dec 30, 2019 05:18', total: '$1,500 (5 Products)', action: 'View Details' },
    { id: '#71667167', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$80 (11 Products)', action: 'View Details' },
    { id: '#95214362', status: 'CANCELED', date: 'Mar 20, 2019 23:14', total: '$160 (3 Products)', action: 'View Details' }
  ];

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" style={{ margin: '20px' }}>
        Recent Order
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell><a href="#">{order.action}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderHistory;
