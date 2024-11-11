// frontend/src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            
            <p>Welcome to admin panel</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
