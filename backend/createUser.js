// backend/createUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

const createTestUser = async () => {
    await connectDB();

    const username = 'test';
    const plainPassword = '123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({ username, password: hashedPassword });

    try {
        await user.save();
        console.log(`User created: ${username}`);
    } catch (error) {
        console.error('Error creating user:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

createTestUser();
