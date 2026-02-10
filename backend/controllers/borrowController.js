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
  },
  {
    _id: "borrow3",
    user: "mock_user_id_2",
    book: "book4",
    borrowDate: new Date("2024-01-25"),
    dueDate: new Date("2024-02-08"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "Pride and Prejudice", isbn: "978-0-14-143951-8" }
  },
  {
    _id: "borrow4",
    user: "mock_user_id_2", 
    book: "book6",
    borrowDate: new Date("2024-01-30"),
    dueDate: new Date("2024-02-13"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "Lord of the Flies", isbn: "978-0-571-05686-2" }
  },
  {
    _id: "borrow5",
    user: "mock_user_id_3",
    book: "book6",
    borrowDate: new Date("2024-02-02"),
    dueDate: new Date("2024-02-16"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "Lord of the Flies", isbn: "978-0-571-05686-2" }
  },
  {
    _id: "borrow6",
    user: "mock_user_id_3",
    book: "book6",
    borrowDate: new Date("2024-02-05"),
    dueDate: new Date("2024-02-19"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "Lord of the Flies", isbn: "978-0-571-05686-2" }
  },
  {
    _id: "borrow7",
    user: "mock_user_id_1",
    book: "book7",
    borrowDate: new Date("2024-01-15"),
    dueDate: new Date("2024-01-29"),
    returnDate: new Date("2024-02-02"),
    status: "returned",
    fine: 4.0,
    snapshot: { title: "The Hobbit", isbn: "978-0-547-92822-7" }
  },
  {
    _id: "borrow8",
    user: "mock_user_id_2",
    book: "book9",
    borrowDate: new Date("2024-01-28"),
    dueDate: new Date("2024-02-05"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "The Da Vinci Code", isbn: "978-0-385-50420-1" }
  },
  {
    _id: "borrow9", 
    user: "mock_user_id_4",
    book: "book9",
    borrowDate: new Date("2024-01-20"),
    dueDate: new Date("2024-02-03"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "The Da Vinci Code", isbn: "978-0-385-50420-1" }
  },
  {
    _id: "borrow10",
    user: "mock_user_id_4",
    book: "book9",
    borrowDate: new Date("2024-02-08"),
    dueDate: new Date("2024-02-22"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "The Da Vinci Code", isbn: "978-0-385-50420-1" }
  },
  {
    _id: "borrow11",
    user: "mock_user_id_1",
    book: "book3", 
    borrowDate: new Date("2024-01-10"),
    dueDate: new Date("2024-01-24"),
    returnDate: new Date("2024-01-26"),
    status: "returned",
    fine: 2.0,
    snapshot: { title: "1984", isbn: "978-0-452-28423-4" }
  },
  {
    _id: "borrow12",
    user: "mock_user_id_5",
    book: "book7", 
    borrowDate: new Date("2024-02-03"),
    dueDate: new Date("2024-02-17"),
    returnDate: null,
    status: "borrowed",
    fine: 0,
    snapshot: { title: "The Hobbit", isbn: "978-0-547-92822-7" }
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
