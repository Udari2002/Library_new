import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Book from "../models/Book.js";

const run = async () => {
  try {
    await connectDB();
    console.log("Connected to DB for seeding");

    // clear collections (optional)
    await User.deleteMany({});
    await Book.deleteMany({});

    // create admin
    const adminPass = process.env.SEED_ADMIN_PASS || "Admin@123";
    const adminHash = await bcrypt.hash(adminPass, 10);
    const admin = await User.create({ name: "Admin", email: "admin@example.com", passwordHash: adminHash, role: "admin" });
    console.log("Created admin:", admin.email);

    // create sample users
    const userPass = "User@123";
    const userHash = await bcrypt.hash(userPass, 10);
    const user1 = await User.create({ name: "Alice", email: "alice@example.com", passwordHash: userHash, role: "user" });
    const user2 = await User.create({ name: "Bob", email: "bob@example.com", passwordHash: userHash, role: "user" });
    console.log("Created sample users", user1.email, user2.email);

    // create sample books
    const books = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", isbn: "9780743273565", totalCopies: 3, copiesAvailable: 3 },
      { title: "1984", author: "George Orwell", category: "Fiction", isbn: "9780451524935", totalCopies: 4, copiesAvailable: 4 },
      { title: "Clean Code", author: "Robert C. Martin", category: "Programming", isbn: "9780132350884", totalCopies: 2, copiesAvailable: 2 }
    ];

    for (const b of books) {
      await Book.create({ ...b, addedBy: admin._id });
    }
    console.log("Seeded books");

    console.log("Seeding completed. Admin password:", adminPass, "User password:", userPass);
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

run();
