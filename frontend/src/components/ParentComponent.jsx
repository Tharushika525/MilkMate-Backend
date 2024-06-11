import React from 'react';
import AdminLogin from '../AdminLogin';

const ParentComponent = () => {
    const handleLogin = (username, password) => {
        // Your login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div>
            <AdminLogin onLogin={handleLogin} />
        </div>
    );
};

export default ParentComponent;
