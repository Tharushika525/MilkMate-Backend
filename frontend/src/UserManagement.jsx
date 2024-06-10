import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ManagementInterface = () => {
    const [users, setUsers] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [editSeller, setEditSeller] = useState(null);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [openSellerDialog, setOpenSellerDialog] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '', phone: '', password: '', city: '' });
    const [sellerData, setSellerData] = useState({ name: '', email: '' });

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

    const handleDeleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/api/user/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
    };

    const handleEditUser = (user) => {
        setEditUser(user);
        setOpenUserDialog(true);
        setUserData({ name: user.name, email: user.email, phone: user.phone, password: user.password, city: user.city });
    };

    const handleUpdateUser = async () => {
        await axios.put(`http://localhost:5000/api/user/${editUser._id}`, userData);
        setEditUser(null);
        setOpenUserDialog(false);
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
    };

    return (
        <div className='container' style={{ backgroundColor: "lightblue", marginLeft: "50px",marginTop:"50px", paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "15px" }}>
            <h2>User Management</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                                    {users.map(user => (
                                        <TableRow key={user._id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDeleteUser(user._id)} variant="contained" color="secondary">Delete</Button>
                                                <Button onClick={() => handleEditUser(user)} variant="contained" color="primary">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            <h2>Seller Management</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                                                <Button onClick={() => handleEditSeller(seller)} variant="contained" color="primary">Edit</Button>
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
                    <TextField label="Name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                    <TextField label="Email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    <TextField label="Phone" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                    <TextField label="Password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    <TextField label="City" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateUser} variant="contained" color="primary">Update</Button>
                    <Button onClick={() => setOpenUserDialog(false)} variant="contained" color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSellerDialog} onClose={() => setOpenSellerDialog(false)}>
                <DialogTitle>Edit Seller</DialogTitle>
                <DialogContent>
                    <TextField label="Name" value={sellerData.name} onChange={(e) => setSellerData({ ...sellerData, name: e.target.value })} />
                    <TextField label="Email" value={sellerData.email} onChange={(e) => setSellerData({ ...sellerData, email: e.target.value })} />
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
