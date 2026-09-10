const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const exists = await User.findOne({ email: 'admin@gmail.com' });
    if (exists) {
      console.log('Admin already exists');
      console.log('Email: admin@gmail.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    await User.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin created!');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('error:', error.message);
    process.exit(1);
  }
};

createAdmin();