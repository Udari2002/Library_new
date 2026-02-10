import Book from "../models/Book.js";
import BorrowRecord from "../models/BorrowRecord.js";
import User from "../models/User.js";

// Sample mock borrow records
const mockBorrowRecords = [
  {
    _id: "borrow1",
    user: "mock_user_id_1",
    book: "book1",
    borrowDate: new Date("2024-02-01"),
    dueDate: new Date("2024-02-15"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "The Great Gatsby", isbn: "978-0-7432-7356-5" }
  },
  {
    _id: "borrow2", 
    user: "mock_user_id_1",
    book: "book2",
    borrowDate: new Date("2024-01-20"),
    dueDate: new Date("2024-02-03"),
    returnDate: new Date("2024-02-05"),
    status: "returned",
    fine: 2.0,
    snapshot: { title: "To Kill a Mockingbird", isbn: "978-0-06-112008-4" }
  }
];

// Borrow a book
export const borrowBook = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId || "mock_user_" + Date.now();
    const { bookId } = req.body;
    
    if (!userId || !bookId) return res.status(400).json({ message: "Missing userId or bookId" });

    console.log("📖 Mock book borrowing");
    
    const loanDays = 14;
    const now = new Date();
    const dueDate = new Date(now.getTime() + loanDays * 24 * 60 * 60 * 1000);

    const newBorrow = {
      _id: "borrow_" + Date.now(),
      user: userId,
      book: bookId,
      borrowDate: now,
      dueDate,
      status: "borrowed",
      fine: 0,
      snapshot: { title: "Mock Book Title", isbn: "978-0-000-00000-0" }
    };

    mockBorrowRecords.push(newBorrow);
    return res.status(201).json(newBorrow);
  } catch (err) {
    console.error("borrowBook error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Return a borrowed record
export const returnBook = async (req, res) => {
  try {
    const { id } = req.params; // borrow record id

    console.log("📖 Mock book return");
    
    const recordIndex = mockBorrowRecords.findIndex(record => record._id === id);
    if (recordIndex === -1) return res.status(404).json({ message: "Borrow record not found" });

    const record = mockBorrowRecords[recordIndex];
    if (record.status === 'returned') return res.status(400).json({ message: "Already returned" });

    const now = new Date();
    record.returnDate = now;
    record.status = 'returned';
    
    // Calculate fine if overdue
    let fine = 0;
    if (record.dueDate && now > record.dueDate) {
      const ms = now - record.dueDate;
      const days = Math.ceil(ms / (24 * 60 * 60 * 1000));
      fine = days * 0.50; // $0.50 per day
    }
    record.fine = fine;

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

    console.log("📖 Mock user borrows retrieval");
    
    const { status } = req.query;
    let filteredRecords = mockBorrowRecords.filter(record => record.user === userId);
    
    if (status) {
      filteredRecords = filteredRecords.filter(record => record.status === status);
    }

    return res.json(filteredRecords);
  } catch (err) {
    console.error("getUserBorrows error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getOverdue = async (req, res) => {
  try {
    console.log("📖 Mock overdue books retrieval");
    
    const now = new Date();
    const overdueRecords = mockBorrowRecords.filter(record => 
      record.status === 'borrowed' && record.dueDate < now
    );
    
    return res.json(overdueRecords);
  } catch (err) {
    console.error("getOverdue error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
