import Book from "../models/Book.js";

export const listBooks = async (_req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
};
