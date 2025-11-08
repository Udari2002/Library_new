#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const usersToAdd = [
  { name: 'Moksha', email: 'moksha@gmail.com', password: 'moksha', role: 'admin' },
  { name: 'Udari', email: 'udari@gmal.com', password: 'udari', role: 'user' },
];

const run = async () => {
  try {
    await connectDB();
    for (const u of usersToAdd) {
      const exists = await User.findOne({ email: u.email.toLowerCase() });
      if (exists) {
        console.log('Already exists:', u.email);
        continue;
      }
      const hash = await bcrypt.hash(u.password, 10);
      const created = await User.create({ name: u.name, email: u.email.toLowerCase(), passwordHash: hash, role: u.role });
      console.log('Created user:', created.email, 'id:', created._id.toString());
    }
  } catch (err) {
    console.error('Failed to add users:', err.message || err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

run();
