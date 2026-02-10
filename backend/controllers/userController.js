import User from '../models/User.js';

// Sample mock users data
const mockUsers = [
  {
    _id: "mock_user_id_1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    lastLogin: new Date("2024-02-10"),
    createdAt: new Date("2024-01-15")
  },
  {
    _id: "mock_user_id_2",
    name: "Jane Smith", 
    email: "jane@example.com",
    role: "user", 
    lastLogin: new Date("2024-02-09"),
    createdAt: new Date("2024-01-20")
  },
  {
    _id: "mock_user_id_3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    lastLogin: new Date("2024-02-08"), 
    createdAt: new Date("2024-01-25")
  },
  {
    _id: "mock_user_id_4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "user",
    lastLogin: new Date("2024-02-07"),
    createdAt: new Date("2024-01-30")
  },
  {
    _id: "mock_user_id_5", 
    name: "David Brown",
    email: "david@example.com",
    role: "user",
    lastLogin: new Date("2024-02-06"),
    createdAt: new Date("2024-02-01")
  },
  {
    _id: "admin1",
    name: "Admin User",
    email: "admin@example.com", 
    role: "admin",
    lastLogin: new Date("2024-02-10"),
    createdAt: new Date("2024-01-01")
  },
  {
    _id: "librarian1",
    name: "Library Manager",
    email: "librarian@example.com",
    role: "admin", 
    lastLogin: new Date("2024-02-10"),
    createdAt: new Date("2024-01-05")
  }
];

export const listUsers = async (req, res) => {
  try {
    console.log("👥 Returning mock users data");
    return res.json(mockUsers);
  } catch (err) {
    console.error('listUsers error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
