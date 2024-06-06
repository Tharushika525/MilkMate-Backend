import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    const fetchUserData = async () => {
      try {
        // Make a GET request to the backend API endpoint that serves user data
        const response = await axios.get('http://localhost:5000/api/register'); // Adjust the endpoint URL
        // Update the component state with the received user data
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the fetchUserData function
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleEditAccount = () => {
    // Implement edit account functionality here
    console.log('Edit account clicked');
  };

  // Render loading state if user data is not yet fetched
  if (!userData) {
    return <div>Loading...</div>;
  }

  // Render dashboard UI with user data
  return (
    <Box className="dashboard-container">
      <Box className="user-info">
        {/* Display user avatar */}
        <Avatar alt={userData.name} src={userData.avatar} sx={{ width: 64, height: 64 }}>J</Avatar>
        <Box className="user-details">
          {/* Display user greeting */}
          <Typography variant="h5">{`Hello, ${userData.name}`}</Typography>
          {/* Display user information */}
          <Typography variant="body1">
            From your account dashboard, you can easily check & view your{' '}
            <Typography component="span" color="primary">Recent Orders</Typography>, manage your{' '}
            <Typography component="span" color="primary">Shipping and Billing Addresses</Typography> and edit your{' '}
            <Typography component="span" color="primary">Password</Typography> and{' '}
            <Typography component="span" color="primary">Account Details</Typography>.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {/* Display user account information */}
        <Grid item xs={12} md={6}>
          <Card className="info-card">
            <CardContent>
              <Typography variant="h6">ACCOUNT INFO</Typography>
              <Typography variant="body1">{userData.name}</Typography>
              <Typography variant="body1">{userData.address}</Typography>
              <Typography variant="body1">Email: {userData.email}</Typography>
              <Typography variant="body1">Phone: {userData.phone}</Typography>
              <Button variant="outlined" className="button" onClick={handleEditAccount}>
                <EditIcon />
                Edit Account
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Other grid items */}

      </Grid>
    </Box>
  );
};

export default Dashboard;
