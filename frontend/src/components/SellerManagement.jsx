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

const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shopName: '',
    contact: '',
    address: '',
  });

  useEffect(() => {
    axios.get('/api/seller')
      .then(response => setSellers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (seller) => {
    setSelectedSeller(seller);
    setFormData(seller);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/seller/${id}`)
      .then(() => setSellers(sellers.filter(seller => seller._id !== id)))
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
    if (selectedSeller) {
      axios.put(`/api/seller/${selectedSeller._id}`, formData)
        .then(response => {
          setSellers(sellers.map(seller => seller._id === selectedSeller._id ? response.data : seller));
          setSelectedSeller(null);
          setFormData({
            name: '',
            email: '',
            shopName: '',
            contact: '',
            address: '',
          });
        })
        .catch(error => console.error(error));
    } else {
      axios.post('/api/seller', formData)
        .then(response => setSellers([...sellers, response.data]))
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h2>Seller Management</h2>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" value={formData.name} onChange={handleChange} required />
        <TextField name="email" label="Email" value={formData.email} onChange={handleChange} required />
        <TextField name="shopName" label="Shop Name" value={formData.shopName} onChange={handleChange} required />
        <TextField name="contact" label="Contact" value={formData.contact} onChange={handleChange} required />
        <TextField name="address" label="Address" value={formData.address} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">
          {selectedSeller ? 'Update Seller' : 'Add Seller'}
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
            {sellers.map(seller => (
              <TableRow key={seller._id}>
                <TableCell>{seller.name}</TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(seller)}>Edit</Button>
                  <Button onClick={() => handleDelete(seller._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SellerManagement;
