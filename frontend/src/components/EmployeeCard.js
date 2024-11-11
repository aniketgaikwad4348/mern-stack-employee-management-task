import React from 'react';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
    return (
        <div className="employee-card">
            {/* Image handling (base64 or URL) */}
            <img 
                src={employee.image ? `data:image/jpeg;base64,${employee.image}` : 'default-image.jpg'} 
                alt={employee.name} 
                style={{ width: '100px', height: '100px' }} 
            />
            <h3>{employee.name}</h3>
            <p>Email: {employee.email}</p>
            <p>Mobile: {employee.mobile}</p>
            <p>Designation: {employee.designation}</p>
            <p>Gender: {employee.gender}</p>
            <p>Courses: {employee.courses.join(', ')}</p>
            <button onClick={() => onEdit(employee)}>Edit</button>
            <button onClick={() => onDelete(employee.id)}>Delete</button>
        </div>
    );
};

export default EmployeeCard;
