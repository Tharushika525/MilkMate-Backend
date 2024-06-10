import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import axios from 'axios';
import Profile from './profile';
import EditForm from './components/Editform';
import UserManagement from './UserManagement';
import SellerManagement from './components/SellerManagement';
import AdminLogin from './AdminLogin';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
      // Perform authentication here, for simplicity, we'll just check if username and password are 'admin'
      if (username === 'admin' && password === 'admin') {
          setIsLoggedIn(true);
      } else {
          alert('Invalid username or password');
      }
  };
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/management" element={isLoggedIn ? <UserManagement  /> : <AdminLogin onLogin={handleLogin} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<EditForm />} />
          <Route path="/users" element={<UserManagement />} /> 
          <Route path="/sellers" element={<SellerManagement />} /> 
    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
