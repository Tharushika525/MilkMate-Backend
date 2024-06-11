import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  CssBaseline,
} from '@mui/material';

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle',
  'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle',
  'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Moneragala',
  'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
  'Trincomalee', 'Vavuniya'
];

const EditForm = () => {
  const location = useLocation();
  const user = location.state?.user;
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: user || {}
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (user && user._id) {
      try {
        const response = await axios.put(`http://localhost:5000/api/user/${user._id}`, data);
        console.log('User updated:', response.data);
        navigate('/profile', { state: { user: response.data } });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      console.error('User ID is not defined');
    }
  };

  // Pre-populate form fields
  useEffect(() => {
    if (user) {
      console.log('User data:', user); // Debugging log
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('city', user.city);
      setValue('streetName', user.streetName);
      setValue('district', user.district);
      setValue('phone', user.phone);
    } else {
      console.error('User is not defined'); // Debugging log
    }
  }, [user, setValue]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Edit Account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            {...register('name', { required: true })}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            {...register('email', { required: true })}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="City"
            {...register('city', { required: true })}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Street Name"
            {...register('streetName', { required: true })}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="District"
            {...register('district', { required: true })}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Phone"
            {...register('phone')}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditForm;
