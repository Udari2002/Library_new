#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Book from '../models/Book.js';
import BorrowRecord from '../models/BorrowRecord.js';

const booksSample = [
  { title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', isbn: '9780132350884', totalCopies: 4 },
  { title: 'You Don\'t Know JS', author: 'Kyle Simpson', category: 'Programming', isbn: '9781491904244', totalCopies: 3 },
  { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', category: 'Programming', isbn: '9781593279509', totalCopies: 5 },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Programming', isbn: '9780201616224', totalCopies: 2 },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fiction', isbn: '9780547928227', totalCopies: 6 },
  { title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', isbn: '9780735211292', totalCopies: 4 }
];

const run = async () => {
  try {
    await connectDB();
    console.log('Populating status-based borrow records...');

    // Ensure users exist
    const wantedEmails = ['admin@example.com','alice@example.com','bob@example.com','moksha@gmail.com','udari@gmal.com'];
    const users = await User.find({ email: { $in: wantedEmails } });
    if (users.length === 0) {
      console.warn('No users found. Run seed.js or add users first.');
    }

    // Ensure books exist
    const createdBooks = [];
    for (const b of booksSample) {
      let book = await Book.findOne({ isbn: b.isbn });
      if (!book) {
        book = await Book.create({ ...b, copiesAvailable: b.totalCopies, addedBy: null });
        console.log('Created book:', b.title);
      } else {
        console.log('Book exists:', b.title);
      }
      createdBooks.push(book);
    }

    // For each user, create one borrowed, one overdue, one returned record
    const now = new Date();
    let bookIndex = 0;
    for (const userEmail of wantedEmails) {
      const user = users.find(u => u.email === userEmail);
      if (!user) continue;

      // borrowed (due in future)
      const b1 = createdBooks[bookIndex % createdBooks.length];
      const existsB1 = await BorrowRecord.findOne({ user: user._id, book: b1._id, status: 'borrowed' });
      if (!existsB1) {
        const due = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        await BorrowRecord.create({ user: user._id, book: b1._id, borrowDate: now, dueDate: due, status: 'borrowed', snapshot: { title: b1.title, isbn: b1.isbn } });
        console.log(`Created borrowed for ${user.email} -> ${b1.title}`);
      }
      bookIndex++;

      // overdue (due in past)
      const b2 = createdBooks[bookIndex % createdBooks.length];
      const existsB2 = await BorrowRecord.findOne({ user: user._id, book: b2._id, status: 'overdue' });
      if (!existsB2) {
        const borrowedAt = new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000);
        const due = new Date(borrowedAt.getTime() + 7 * 24 * 60 * 60 * 1000);
        await BorrowRecord.create({ user: user._id, book: b2._id, borrowDate: borrowedAt, dueDate: due, status: 'overdue', fine: 5, snapshot: { title: b2.title, isbn: b2.isbn } });
        console.log(`Created overdue for ${user.email} -> ${b2.title}`);
      }
      bookIndex++;

      // returned
      const b3 = createdBooks[bookIndex % createdBooks.length];
      const existsB3 = await BorrowRecord.findOne({ user: user._id, book: b3._id, status: 'returned' });
      if (!existsB3) {
        const borrowedAt = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
        const returnDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
        await BorrowRecord.create({ user: user._id, book: b3._id, borrowDate: borrowedAt, dueDate: new Date(borrowedAt.getTime() + 7 * 24 * 60 * 60 * 1000), returnDate, status: 'returned', fine: 0, snapshot: { title: b3.title, isbn: b3.isbn } });
        console.log(`Created returned for ${user.email} -> ${b3.title}`);
      }
      bookIndex++;
    }

    // Recalculate copiesAvailable for each book: totalCopies - active borrows (borrowed or overdue)
    for (const book of createdBooks) {
      const active = await BorrowRecord.countDocuments({ book: book._id, status: { $in: ['borrowed', 'overdue'] } });
      const newAvailable = Math.max(0, book.totalCopies - active);
      await Book.findByIdAndUpdate(book._id, { copiesAvailable: newAvailable });
      console.log(`Updated copiesAvailable for ${book.title}: ${newAvailable} (active borrows: ${active})`);
    }

    console.log('Population complete.');
  } catch (err) {
    console.error('populateStatusData failed:', err.message || err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

run();
