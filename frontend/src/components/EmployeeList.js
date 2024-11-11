import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/employees');
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            setEmployees(employees.filter((employee) => employee._id !== id));
            alert('Employee deleted successfully');
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee.");
        }
    };

    return (
        <div className="employee-list-container">
            <header>
                <h1>Employee List</h1>
                <p>Total Employees: {filteredEmployees.length}</p>
                <div className="actions">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to="/employees/new" className="create-button">Create Employee</Link>
                </div>
            </header>
            
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Courses</th>
                        <th>Create Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>
                                {employee.image ? (
                                    <img
                                        src={employee.image}  // Base64 image from backend
                                        alt={employee.name}
                                        className="employee-image"
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.courses.join(', ')}</td>
                            <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => navigate(`/employees/${employee._id}/edit`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(employee._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
