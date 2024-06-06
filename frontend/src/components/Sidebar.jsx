// src/components/Sidebar.js
import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const sidebarItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/profile' },
  { text: 'Track Order', icon: <LocalShippingIcon />, path: '/track-order' },
  { text: 'Shopping Cart', icon: <ShoppingCartIcon />, path: '/shopping-cart' },
  { text: 'Cards & Address', icon: <CreditCardIcon />, path: '/cards-address' },
   { text: 'Log-out', icon: <ExitToAppIcon />, path: '/logout' }
];

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#f5f5f5',
    color: '#000',
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
}));

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem button key={index} component={NavLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
