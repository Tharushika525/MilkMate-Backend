import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      console.log('Login successful:', response.data);
      navigate('/profile', { state: { user: response.data } });
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
          backgroundColor: 'rgba(48, 90, 206, 0.8)',
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
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 4, message: 'Password must be at least 4 characters' },
              maxLength: { value: 12, message: 'Password must be no more than 12 characters' },
            })}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          {errors.server && (
            <Typography variant="body2" color="error">
              {errors.server.message}
            </Typography>
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
