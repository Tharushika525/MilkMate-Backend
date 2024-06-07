// Profile.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dasboard';
import OrderHistory from './components/OrderHistory';
import RecommendedProducts from './components/RecommendedProducts';
import Pagedrawer from './components/PageDrawer';
import './profile.css'

export default function Profile() {
  return (
   
    <div className="profile-container">
    <Sidebar />
    <div className="content-container">
      <div className="main-content">
        <Dashboard />
        <OrderHistory />
        <RecommendedProducts />
      </div>
      <div className="drawer-container">
        <Pagedrawer />
      </div>
    </div>
  </div>
  );
}
