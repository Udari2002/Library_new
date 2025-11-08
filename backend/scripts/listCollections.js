#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import mongoose from 'mongoose';

const run = async () => {
  try {
    await connectDB();
    const cols = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in', mongoose.connection.db.databaseName, ':', cols.map(c => c.name));
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log('users count:', users.length);
    if (users.length > 0) {
      console.log('Sample user documents (first 5):');
      console.log(users.slice(0, 5));
    }
  } catch (err) {
    console.error('Error listing collections:', err.message || err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

run();
