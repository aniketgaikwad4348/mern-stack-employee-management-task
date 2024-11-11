// backend/models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    courses: { type: [String], required: true },  // Array of course names
    image: { type: Buffer, required: false },  // Image data (Buffer to store image as binary)
    createDate: { type: Date, default: Date.now }, // Creation date
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
