// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="logo">Logo</div>
            <nav>
                {token && (
                    <>
                        <Link to="/employees">Home</Link>
                        <Link to="/employees">Employee List</Link>
                    </>
                )}
            </nav>
            <div className="user-info">
                {token ? (
                    <>
                        <span>{username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
