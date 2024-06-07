import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Container } from '@mui/material';
import image1 from '../images/1.jpeg';
import image2 from '../images/2.jpeg';
import image3 from '../images/3.jpeg';
import image4 from '../images/4.jpeg';

const products = [
  { id: 1, name: 'Fresh Home Made Milk -450ml', price: '$10', image:image1, rating: 738 },
  { id: 2, name: 'Thissamaharama Original Curd 450g', price: '$20', image: image2, rating: 536 },
  { id: 3, name: 'Home Made White Cheese -1kg', price: '$50', image:image3, rating: 423, bestDeal: true },
  { id: 4, name: 'Home Made curd-350ml', price: '$30', image: image4, rating: 423, bestDeal: true },
  // Add more products as needed
];

const RecommendedProducts = () => {
  return (
    <Container>
      <Typography variant="h6" component="div" style={{ margin: '20px' }}>
        Recommended for You
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.name}
                </Typography>
                <Typography variant="h6">
                  {product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.rating} ratings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecommendedProducts;
