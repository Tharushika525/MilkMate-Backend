import React, { useState } from 'react';
import { Button, Grid, Paper, TextField } from '@mui/material';

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Basic validation, you can add more validation as per your requirements
        if (username.trim() === '' || password.trim() === '') {
            alert('Please enter both username and password');
            return;
        }
        // You can add more advanced authentication logic here
        onLogin(username, password);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Login
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AdminLogin;
