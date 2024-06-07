import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm'
import axios from 'axios';
import Profile from './profile'

function App() {
  return (
    <div>
    <Router>
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </Router>
  
    </div>
  );
}

export default App;
