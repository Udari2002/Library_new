const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

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
