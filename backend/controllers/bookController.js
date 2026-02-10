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
  },
  {
    _id: "book4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    genre: "Romance",
    publishedYear: 1813,
    totalCopies: 3,
    availableCopies: 1,
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04")
  },
  {
    _id: "book5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
    genre: "Fiction",
    publishedYear: 1951,
    totalCopies: 4,
    availableCopies: 4,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
  },
  {
    _id: "book6",
    title: "Lord of the Flies",
    author: "William Golding",
    isbn: "978-0-571-05686-2",
    genre: "Fiction",
    publishedYear: 1954,
    totalCopies: 3,
    availableCopies: 0,
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-06")
  },
  {
    _id: "book7",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0-547-92822-7",
    genre: "Fantasy",
    publishedYear: 1937,
    totalCopies: 5,
    availableCopies: 2,
    createdAt: new Date("2024-01-07"),
    updatedAt: new Date("2024-01-07")
  },
  {
    _id: "book8",
    title: "Harry Potter and the Philosopher's Stone", 
    author: "J.K. Rowling",
    isbn: "978-0-7475-3269-9",
    genre: "Fantasy",
    publishedYear: 1997,
    totalCopies: 8,
    availableCopies: 5,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08")
  },
  {
    _id: "book9",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    isbn: "978-0-385-50420-1",
    genre: "Mystery",
    publishedYear: 2003,
    totalCopies: 4,
    availableCopies: 1,
    createdAt: new Date("2024-01-09"),
    updatedAt: new Date("2024-01-09")
  },
  {
    _id: "book10",
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn: "978-0-06-085052-4",
    genre: "Science Fiction",
    publishedYear: 1932,
    totalCopies: 3,
    availableCopies: 2,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
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
