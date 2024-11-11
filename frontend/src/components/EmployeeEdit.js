// frontend/src/components/EmployeeEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeEdit.css';

const EmployeeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: null
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/employees/${id}`);
                setFormData({
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    designation: data.designation,
                    gender: data.gender,
                    courses: data.courses,
                    image: null  // Reset image
                });
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            courses: checked
                ? [...prevState.courses, value]
                : prevState.courses.filter((course) => course !== value)
        }));
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = new FormData();
        updatedData.append('name', formData.name);
        updatedData.append('email', formData.email);
        updatedData.append('mobile', formData.mobile);
        updatedData.append('designation', formData.designation);
        updatedData.append('gender', formData.gender);
        formData.courses.forEach((course) => updatedData.append('courses', course));
        if (formData.image) updatedData.append('image', formData.image);

        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, updatedData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Employee updated successfully!");
            navigate('/employees');
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee.");
        }
    };

    return (
        <div className="employee-edit-container">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mobile No:</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} pattern="\d*" required />
                </div>
                <div className="form-group">
                    <label>Designation:</label>
                    <select name="designation" value={formData.designation} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <label><input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === "Male"} /> Male</label>
                    <label><input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender === "Female"} /> Female</label>
                </div>
                <div className="form-group">
                    <label>Course:</label>
                    <label><input type="checkbox" value="MCA" onChange={handleCheckboxChange} checked={formData.courses.includes("MCA")} /> MCA</label>
                    <label><input type="checkbox" value="BCA" onChange={handleCheckboxChange} checked={formData.courses.includes("BCA")} /> BCA</label>
                    <label><input type="checkbox" value="BSC" onChange={handleCheckboxChange} checked={formData.courses.includes("BSC")} /> BSC</label>
                </div>
                <div className="form-group">
                    <label>Image Upload:</label>
                    <input type="file" onChange={handleImageChange} accept=".jpg,.png" />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EmployeeEdit;
