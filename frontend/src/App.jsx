import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import Profile from './Profile';
import EditForm from './components/EditForm';
import UserManagement from './UserManagement';
import SellerManagement from './components/SellerManagement';
import AdminLogin from './AdminLogin';
import LoginForm from './LoginForm';
import ParentComponent from './components/ParentComponent';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      navigate('/management');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/management" element={<UserManagement />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditForm />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/sellers" element={<SellerManagement />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/parent-component" element={<ParentComponent />} />
        {isLoggedIn && (
          <Route path="/profile" element={<Profile />} />
        )}
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
