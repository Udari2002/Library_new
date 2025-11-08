import Book from "../models/Book.js";
import BorrowRecord from "../models/BorrowRecord.js";
import User from "../models/User.js";

// Borrow a book
export const borrowBook = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId; // prefer authenticated user
    const { bookId } = req.body;
    if (!userId || !bookId) return res.status(400).json({ message: "Missing userId or bookId" });

    // decrement available copies atomically
    const book = await Book.findOneAndUpdate(
      { _id: bookId, copiesAvailable: { $gt: 0 } },
      { $inc: { copiesAvailable: -1 } },
      { new: true }
    );

    if (!book) return res.status(400).json({ message: "No available copies" });

    const loanDays = parseInt(process.env.DEFAULT_LOAN_DAYS || "14", 10);
    const now = new Date();
    const dueDate = new Date(now.getTime() + loanDays * 24 * 60 * 60 * 1000);

    const snapshot = { title: book.title, isbn: book.isbn };

    const borrow = await BorrowRecord.create({
      user: userId,
      book: bookId,
      borrowDate: now,
      dueDate,
      status: "borrowed",
      snapshot
    });

    return res.status(201).json(borrow);
  } catch (err) {
    console.error("borrowBook error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Return a borrowed record
export const returnBook = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params; // borrow record id

    const record = await BorrowRecord.findById(id).populate('book');
    if (!record) return res.status(404).json({ message: "Borrow record not found" });

    // only borrower or admin can return
    if (req.user.role !== 'admin' && record.user.toString() !== userId) return res.status(403).json({ message: "Forbidden" });

    if (record.status === 'returned') return res.status(400).json({ message: "Already returned" });

    const now = new Date();
    record.returnDate = now;
    // compute fine
    let fine = 0;
    if (record.dueDate && now > record.dueDate) {
      const ms = now - record.dueDate;
      const days = Math.ceil(ms / (24 * 60 * 60 * 1000));
      const perDay = parseFloat(process.env.FINE_PER_DAY || "0");
      fine = days * perDay;
    }
    record.fine = fine;
    record.status = 'returned';
    await record.save();

    // increment book available
    await Book.findByIdAndUpdate(record.book._id, { $inc: { copiesAvailable: 1 } });

    return res.json(record);
  } catch (err) {
    console.error("returnBook error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserBorrows = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { status } = req.query;
    const q = { user: userId };
    if (status) q.status = status;

    const list = await BorrowRecord.find(q).sort({ borrowDate: -1 }).populate('book');
    return res.json(list);
  } catch (err) {
    console.error("getUserBorrows error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getOverdue = async (req, res) => {
  try {
    const now = new Date();
    const list = await BorrowRecord.find({ status: 'borrowed', dueDate: { $lt: now } }).populate('book user');
    return res.json(list);
  } catch (err) {
    console.error("getOverdue error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
