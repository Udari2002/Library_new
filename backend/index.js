const express = require("express");
const cors = require("cors");
// Import the correct auth routes that use MongoDB
// Note: Need to convert to CommonJS or use dynamic import
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: ['http://44.198.192.218:3000', 'http://localhost:3000', 'http://34.229.72.128:3000'],
  credentials: true
}));

app.use(express.json());

// Simple auth endpoints that connect to MongoDB
app.post("/api/auth/register", async (req, res) => {
  res.json({ message: "Register endpoint - needs MongoDB connection" });
});

app.post("/api/auth/login", async (req, res) => {
  res.json({ message: "Login endpoint - needs MongoDB connection" });
});

// Add simple endpoints for missing routes
app.get("/api/books", (req, res) => {
  res.json([{ id: 1, title: "Sample Book", author: "Author", isbn: "123" }]);
});

app.get("/api/borrows", (req, res) => {
  res.json([]);
});

app.post("/api/borrows", (req, res) => {
  res.json({ message: "Borrow created", bookId: req.body.bookId });
});

app.get("/", (req, res) => {
  res.json({ message: "📚 Library API Running" });
});

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
