import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = ({ onEmployeeCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        // Prepare form data for submission
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('mobile', formData.mobile);
        data.append('designation', formData.designation);
        data.append('gender', formData.gender);
        formData.courses.forEach((course) => data.append('courses', course));
        data.append('image', formData.image);  // Ensure this corresponds with the backend field name

        try {
            const response = await axios.post('http://localhost:5000/api/employees', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert("Employee created successfully!");

            // Reset form fields after successful submission
            setFormData({
                name: '',
                email: '',
                mobile: '',
                designation: '',
                gender: '',
                courses: [],
                image: null
            });

            if (onEmployeeCreated) {
                onEmployeeCreated(response.data);
            }
        } catch (error) {
            console.error("Error creating employee:", error);
            alert("There was an error creating the employee. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="employee-form">
            <h2>Create Employee</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Mobile No:</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} pattern="\d*" required />
            </div>
            <div>
                <label>Designation:</label>
                <select name="designation" value={formData.designation} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>
            </div>
            <div>
                <label>Gender:</label>
                <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
                <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
            </div>
            <div>
                <label>Course:</label>
                <label><input type="checkbox" value="MCA" onChange={handleCheckboxChange} /> MCA</label>
                <label><input type="checkbox" value="BCA" onChange={handleCheckboxChange} /> BCA</label>
                <label><input type="checkbox" value="BSC" onChange={handleCheckboxChange} /> BSC</label>
            </div>
            <div>
                <label>Img Upload:</label>
                <input type="file" onChange={handleImageChange} accept=".jpg,.png" required />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default EmployeeForm;
