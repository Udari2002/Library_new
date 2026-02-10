import Book from "../models/Book.js";

// Sample mock books data
const mockBooks = [
  {
    _id: "book1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    genre: "Fiction",
    publishedYear: 1925,
    totalCopies: 5,
    availableCopies: 3,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    _id: "book2", 
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    genre: "Fiction",
    publishedYear: 1960,
    totalCopies: 4,
    availableCopies: 2,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02")
  },
  {
    _id: "book3",
    title: "1984",
    author: "George Orwell", 
    isbn: "978-0-452-28423-4",
    genre: "Dystopian Fiction",
    publishedYear: 1949,
    totalCopies: 6,
    availableCopies: 4,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03")
  }
];

export const listBooks = async (_req, res) => {
  console.log("📚 Returning mock books data");
  res.json(mockBooks);
};

export const createBook = async (req, res) => {
  console.log("📚 Mock book creation");
  const newBook = {
    _id: "book_" + Date.now(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockBooks.push(newBook);
  res.status(201).json(newBook);
};

export const updateBook = async (req, res) => {
  console.log("📚 Mock book update");
  const { id } = req.params;
  const bookIndex = mockBooks.findIndex(book => book._id === id);
  if (bookIndex !== -1) {
    mockBooks[bookIndex] = { ...mockBooks[bookIndex], ...req.body, updatedAt: new Date() };
    res.json(mockBooks[bookIndex]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

export const deleteBook = async (req, res) => {
  console.log("📚 Mock book deletion");
  const { id } = req.params;
  const bookIndex = mockBooks.findIndex(book => book._id === id);
  if (bookIndex !== -1) {
    mockBooks.splice(bookIndex, 1);
  }
  res.json({ message: "Deleted" });
};
