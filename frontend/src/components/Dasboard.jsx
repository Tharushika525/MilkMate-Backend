import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import EditIcon from '@mui/icons-material/Edit';

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [userData, setUserData] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData && user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/${user.id}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [userData, user]);

  const handleEditAccount = () => {
    navigate('/edit', { state: { user: userData } });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="dashboard-container" sx={{ p: 3 }}>
      <Box
        className="user-info"
        display="flex"
        alignItems="center"
        mb={3}
        sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2 }}
      >
        <Avatar alt={userData.name} src={userData.avatar} sx={{ width: 64, height: 64 }}>
          {userData.name[0]}
        </Avatar>
        <Box className="user-details" ml={2}>
          <Typography variant="h5">{`Hello, ${userData.name}`}</Typography>
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
        <Grid item xs={12} md={6}>
          <Card className="info-card" sx={{ backgroundColor: '#e3f2fd', p: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>ACCOUNT INFO</Typography>
              <Typography variant="body1">{userData.name}</Typography>
              <Typography variant="body1">{`${userData.streetName}, ${userData.city}, ${userData.district}`}</Typography>
              <Typography variant="body1">{`Email: ${userData.email}`}</Typography>
              <Typography variant="body1">{`Phone: ${userData.phone}`}</Typography>
              <Button
                variant="outlined"
                className="button"
                onClick={handleEditAccount}
                sx={{ mt: 2 }}
              >
                <EditIcon sx={{ mr: 1 }} />
                Edit Account
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
