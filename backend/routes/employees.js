const express = require('express');
const multer = require('multer');
const Employee = require('../models/Employee');
const router = express.Router();

// Set up Multer storage (memory storage for file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET all employees with Base64 encoded images
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        const employeesWithImages = employees.map(employee => ({
            ...employee.toObject(),
            image: employee.image ? `data:image/jpeg;base64,${employee.image.toString('base64')}` : null,
        }));
        res.json(employeesWithImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create a new employee
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, courses } = req.body;
        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            courses: courses ? courses.split(',') : [],
            image: req.file ? req.file.buffer : null,
        });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update an employee by ID
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, courses } = req.body;
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const updatedEmployeeData = {
            name,
            email,
            mobile,
            designation,
            gender,
            courses: courses ? courses.split(',') : employee.courses,
            image: req.file ? req.file.buffer : employee.image,
        };

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            updatedEmployeeData,
            { new: true }
        );

        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update employee', error: error.message });
    }
});

// DELETE an employee by ID
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete employee', error: error.message });
    }
});

module.exports = router;
