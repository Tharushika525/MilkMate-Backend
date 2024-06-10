import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Button, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    city: '',
    streetName: '',
    remarks: '',
    district: '',
    terms: '',
  });

  useEffect(() => {
    axios.get('/api/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/user/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      axios.put(`/api/user/${selectedUser._id}`, formData)
        .then(response => {
          setUsers(users.map(user => user._id === selectedUser._id ? response.data : user));
          setSelectedUser(null);
          setFormData({
            name: '',
            email: '',
            password: '',
            gender: '',
            city: '',
            streetName: '',
            remarks: '',
            district: '',
            terms: '',
          });
        })
        .catch(error => console.error(error));
    } else {
      axios.post('/api/user', formData)
        .then(response => setUsers([...users, response.data]))
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" value={formData.name} onChange={handleChange} required />
        <TextField name="email" label="Email" value={formData.email} onChange={handleChange} required />
        <TextField name="password" label="Password" value={formData.password} onChange={handleChange} required />
        <TextField name="gender" label="Gender" value={formData.gender} onChange={handleChange} required />
        <TextField name="city" label="City" value={formData.city} onChange={handleChange} required />
        <TextField name="streetName" label="Street Name" value={formData.streetName} onChange={handleChange} required />
        <TextField name="remarks" label="Remarks" value={formData.remarks} onChange={handleChange} />
        <TextField name="district" label="District" value={formData.district} onChange={handleChange} required />
        <TextField name="terms" label="Terms" value={formData.terms} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">
          {selectedUser ? 'Update User' : 'Add User'}
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserManagement;
