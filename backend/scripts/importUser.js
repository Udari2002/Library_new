// backend/scripts/importUsers.js
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import fs from 'fs';

const run = async () => {
  try {
    await connectDB();
    const raw = fs.readFileSync(new URL('../data/users.json', import.meta.url), 'utf8');
    const users = JSON.parse(raw || '[]');

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        console.log('Exists:', u.email);
        continue;
      }
      const pwd = u.password || process.env.SEED_USER_PASSWORD || 'User@123';
      const hash = await bcrypt.hash(pwd, 10);
      await User.create({ name: u.name || u.fullName || u.username, email: u.email, passwordHash: hash, role: u.role || 'user' });
      console.log('Created user:', u.email);
    }
    console.log('Done.');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

run();