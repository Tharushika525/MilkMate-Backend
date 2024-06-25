import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button, Grid, Paper, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, AppBar, Toolbar, Typography, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PrintIcon from '@mui/icons-material/Print';

const ManagementInterface = () => {
    const [users, setUsers] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [editSeller, setEditSeller] = useState(null);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [openSellerDialog, setOpenSellerDialog] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '', phone: '', city: '' });
    const [sellerData, setSellerData] = useState({ name: '', email: '' });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        };

        const fetchSellers = async () => {
            const response = await axios.get('http://localhost:5000/api/sellers');
            setSellers(response.data);
        };

        fetchUsers();
        fetchSellers();
    }, []);

    const handleLogout = () => {
        navigate('/admin-login');
    };

    const handleDeleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/api/user/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
    };

    const handleEditUser = (user) => {
        setEditUser(user);
        setOpenUserDialog(true);
        setUserData({ name: user.name, email: user.email, phone: user.phone, city: user.city });
    };

    const handleUpdateUser = async () => {
        await axios.put(`http://localhost:5000/api/user/${editUser._id}`, userData);
        setEditUser(null);
        setOpenUserDialog(false);
        const updatedUsers = users.map((u) => (u._id === editUser._id ? { ...u, ...userData } : u));
        setUsers(updatedUsers);
    };

    const handleDeleteSeller = async (sellerId) => {
        await axios.delete(`http://localhost:5000/api/seller/${sellerId}`);
        setSellers(sellers.filter(seller => seller._id !== sellerId));
    };

    const handleEditSeller = (seller) => {
        setEditSeller(seller);
        setOpenSellerDialog(true);
        setSellerData({ name: seller.name, email: seller.email });
    };

    const handleUpdateSeller = async () => {
        await axios.put(`http://localhost:5000/api/seller/${editSeller._id}`, sellerData);
        setEditSeller(null);
        setOpenSellerDialog(false);
        const updatedSellers = sellers.map((s) => (s._id === editSeller._id ? { ...s, ...sellerData } : s));
        setSellers(updatedSellers);
    };

    const generatePDF = (type) => {
        const doc = new jsPDF();
        const tableData = type === 'users' ? users : sellers;
        const columns = type === 'users'
            ? ['Name', 'Email', 'Phone', 'City']
            : ['Name', 'Email'];

        const rows = tableData.map(item => type === 'users'
            ? [item.name, item.email, item.phone, item.city]
            : [item.name, item.email]);

        doc.autoTable({
            head: [columns],
            body: rows,
        });

        doc.save(`${type}.pdf`);
    };

    return (
        <div className='container' style={{ backgroundColor: "lightblue", margin: "50px auto", padding: "15px", maxWidth: "1200px" }}>
            <AppBar position="static" style={{ marginBottom: "20px" }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                    <Button onClick={handleLogout} variant="contained" color="secondary">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5">User Management</Typography>
                    <Button onClick={() => generatePDF('users')} variant="contained" color="primary" startIcon={<PrintIcon />} style={{ marginBottom: "10px" }}>
                        Generate PDF
                    </Button>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map(user => (
                                        <TableRow key={user._id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>{user.city}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDeleteUser(user._id)} variant="contained" color="secondary">Delete</Button>
                                                <Button onClick={() => handleEditUser(user)} variant="contained" color="primary" style={{ marginLeft: "10px" }}>Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5">Seller Management</Typography>
                    <Button onClick={() => generatePDF('sellers')} variant="contained" color="primary" startIcon={<PrintIcon />} style={{ marginBottom: "10px" }}>
                        Generate PDF
                    </Button>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sellers.map(seller => (
                                        <TableRow key={seller._id}>
                                            <TableCell>{seller.name}</TableCell>
                                            <TableCell>{seller.email}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDeleteSeller(seller._id)} variant="contained" color="secondary">Delete</Button>
                                                <Button onClick={() => handleEditSeller(seller)} variant="contained" color="primary" style={{ marginLeft: "10px" }}>Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="dense" label="Name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                    <TextField fullWidth margin="dense" label="Email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    <TextField fullWidth margin="dense" label="Phone" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                    <TextField fullWidth margin="dense" label="City" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateUser} variant="contained" color="primary">Update</Button>
                    <Button onClick={() => setOpenUserDialog(false)} variant="contained" color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSellerDialog} onClose={() => setOpenSellerDialog(false)}>
                <DialogTitle>Edit Seller</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="dense" label="Name" value={sellerData.name} onChange={(e) => setSellerData({ ...sellerData, name: e.target.value })} />
                    <TextField fullWidth margin="dense" label="Email" value={sellerData.email} onChange={(e) => setSellerData({ ...sellerData, email: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateSeller} variant="contained" color="primary">Update</Button>
                    <Button onClick={() => setOpenSellerDialog(false)} variant="contained" color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManagementInterface;
