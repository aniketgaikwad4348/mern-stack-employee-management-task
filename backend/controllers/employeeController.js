const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    try {
        const newEmployee = new Employee({ name, email, mobile, designation, gender, course });
        await newEmployee.save();
        res.json(newEmployee);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await Employee.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
