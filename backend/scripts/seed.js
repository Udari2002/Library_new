#!/usr/bin/env node
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

dotenv.config();

import User from "../models/User.js";
import Book from "../models/Book.js";
import BorrowRecord from "../models/BorrowRecord.js";

/**
 * Idempotent seeding script:
 * - ensures an admin exists
 * - creates two sample users if missing
 * - creates a few books if missing
 * - creates one borrowed and one overdue borrow record if missing
 */
const seed = async () => {
  try {
    await connectDB();

    console.log("Seeding data — will create sample admin, users, books, and borrow records if missing...");

    // Create admin user if not exists
    const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || "Admin@123", 10);
      admin = await User.create({ name: "Admin", email: adminEmail, passwordHash: hash, role: "admin" });
      console.log("Created admin:", adminEmail);
    } else {
      console.log("Admin already exists:", adminEmail);
    }

    // Create sample users
    const usersData = [
      { name: "Alice", email: "alice@example.com", password: process.env.SEED_USER_PASSWORD || "User@123" },
      { name: "Bob", email: "bob@example.com", password: process.env.SEED_USER_PASSWORD || "User@123" }
    ];

    const createdUsers = [];
    for (const u of usersData) {
      let found = await User.findOne({ email: u.email });
      if (!found) {
        const hash = await bcrypt.hash(u.password, 10);
        found = await User.create({ name: u.name, email: u.email, passwordHash: hash, role: "user" });
        console.log("Created user:", u.email);
      } else {
        console.log("User exists:", u.email);
      }
      createdUsers.push(found);
    }

    // Create sample books
    const booksSample = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", isbn: "9780743273565", totalCopies: 5, copiesAvailable: 5 },
      { title: "1984", author: "George Orwell", category: "Dystopia", isbn: "9780451524935", totalCopies: 8, copiesAvailable: 8 },
      { title: "Sapiens", author: "Yuval Noah Harari", category: "History", isbn: "9780062316097", totalCopies: 4, copiesAvailable: 4 }
    ];

    const createdBooks = [];
    for (const b of booksSample) {
      let book = await Book.findOne({ isbn: b.isbn });
      if (!book) {
        book = await Book.create({ ...b, addedBy: admin._id });
        console.log("Created book:", b.title);
      } else {
        console.log("Book exists:", b.title);
      }
      createdBooks.push(book);
    }

    // Create a borrow record for Alice (borrowed)
    const alice = createdUsers[0];
    const bookForAlice = createdBooks[0];
    if (alice && bookForAlice) {
      const borrowExists = await BorrowRecord.findOne({ user: alice._id, book: bookForAlice._id, status: "borrowed" });
      if (!borrowExists) {
        const now = new Date();
        const due = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await BorrowRecord.create({ user: alice._id, book: bookForAlice._id, borrowDate: now, dueDate: due, status: "borrowed", snapshot: { title: bookForAlice.title, isbn: bookForAlice.isbn } });
        console.log("Created borrow record for:", alice.email, "->", bookForAlice.title);
      } else {
        console.log("Borrow record already exists for", alice.email);
      }
    }

    // Create an overdue record for Bob
    const bob = createdUsers[1];
    const bookForBob = createdBooks[1];
    if (bob && bookForBob) {
      const overdueExists = await BorrowRecord.findOne({ user: bob._id, book: bookForBob._id, status: "overdue" });
      if (!overdueExists) {
        const borrowedAt = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000); // 20 days ago
        const due = new Date(borrowedAt.getTime() + 7 * 24 * 60 * 60 * 1000); // due 13 days ago -> overdue
        await BorrowRecord.create({ user: bob._id, book: bookForBob._id, borrowDate: borrowedAt, dueDate: due, status: "overdue", fine: 10, snapshot: { title: bookForBob.title, isbn: bookForBob.isbn } });
        console.log("Created overdue borrow for:", bob.email);
      } else {
        console.log("Overdue record already exists for", bob.email);
      }
    }

    console.log("Seeding complete.");
  } catch (err) {
    console.error("Seeding failed:", err.message || err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seed();
