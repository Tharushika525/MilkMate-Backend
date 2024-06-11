import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle',
  'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle',
  'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Moneragala',
  'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
  'Trincomalee', 'Vavuniya'
];

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const emailExists = await axios.post('http://localhost:5000/api/check-email', { email: data.email });
      if (emailExists.data.exists) {
        setError('email', { type: 'manual', message: 'Email is already registered' });
        return;
      }

      const response = await axios.post('http://localhost:5000/api/user', data);
      console.log('Registration successful:', response.data);
      navigate('/profile', { state: { user: response.data } });
    } catch (error) {
      console.error('Error submitting form:', error);
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
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="User Name"
            {...register('name', { required: 'User Name is required' })}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
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
          <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.gender}>
            <InputLabel style={{ color: 'white' }}>Gender</InputLabel>
            <Select
              label="Gender"
              {...register('gender', { required: 'Gender is required' })}
              defaultValue=""
              style={{ color: 'white' }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
          // RegistrationForm component

<TextField
  label="City"
  {...register('city', { required: 'City is required' })}
  fullWidth
  margin="normal"
  variant="outlined"
  error={!!errors.city}
  helperText={errors.city?.message}
  InputLabelProps={{ style: { color: 'white' } }}
  InputProps={{
    style: { color: 'white' },
  }}
/>

<TextField
  label="Street Name"
  {...register('streetName', { required: 'Street Name is required' })}
  fullWidth
  margin="normal"
  variant="outlined"
  error={!!errors.streetName}
  helperText={errors.streetName?.message}
  InputLabelProps={{ style: { color: 'white' } }}
  InputProps={{
    style: { color: 'white' },
  }}
/>

          <TextField
            label="Remarks (Optional)"
            {...register('remarks')}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.district}>
            <InputLabel style={{ color: 'white' }}>District</InputLabel>
            <Select
              label="District"
              {...register('district', { required: 'District is required' })}
              defaultValue=""
              style={{ color: 'white' }}
            >
              {districts.map((district) => (
                <MenuItem key={district} value={district}>{district}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.district?.message}</FormHelperText>
          </FormControl>
          <TextField
            label="Mobile Number"
            {...register('phone', {
              required: 'Mobile Number is required',
              pattern: {
                value: /^(\+94|0)?[1-9]\d{8}$/,
                message: 'Invalid Sri Lankan mobile number',
              },
            })}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <FormControlLabel
            control={<Checkbox {...register('terms', { required: 'You must agree to the terms' })} />}
            label="I agree to terms and conditions"
            style={{ color: 'white' }}
          />
          <FormHelperText error={!!errors.terms}>{errors.terms?.message}</FormHelperText>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2, bgcolor: '#6200ea', '&:hover': { bgcolor: '#3700b3' } }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
