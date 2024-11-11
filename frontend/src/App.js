// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

function App() {
    const token = localStorage.getItem('token');

    return (
        <Router>
            {token && <Navbar userName="Hukum Gupta" />}
            <Routes>
                <Route path="/" element={token ? <Navigate to="/employees" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/employees" element={token ? <EmployeeList /> : <Navigate to="/login" />} />
                <Route path="/employees/:id/edit" element={token ? <EmployeeEdit /> : <Navigate to="/login" />} />
                <Route path="/employees/new" element={<EmployeeForm />} />
            </Routes>
        </Router>
    );
}

export default App;
