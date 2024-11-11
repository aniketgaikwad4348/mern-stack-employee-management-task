// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
