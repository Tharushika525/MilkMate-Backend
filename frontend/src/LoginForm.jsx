import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, FormHelperText } from '@mui/material';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Form data:', data);

    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      console.log('Login successful:', response.data);

      // Save user id to localStorage
      localStorage.setItem('id', response.data.user._id);

      // Navigate to the profile page
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        setError('server', { type: 'manual', message: error.response.data.message || 'Login failed. Please check your credentials and try again.' });
      } else if (error.request) {
        setError('server', { type: 'manual', message: 'No response from the server. Please try again later.' });
      } else {
        setError('server', { type: 'manual', message: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: '50px',
          maxWidth: '400px',
          margin: 'auto',
          padding: '20px',
          backgroundColor: 'rgb(106, 90, 205)',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom textAlign="center" color="white">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            {...register('email', { required: 'Email is required' })}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          {errors.server && (
            <FormHelperText error>{errors.server.message}</FormHelperText>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2, bgcolor: '#6200ea', '&:hover': { bgcolor: '#3700b3' } }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
