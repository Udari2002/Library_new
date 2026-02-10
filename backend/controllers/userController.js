import User from '../models/User.js';

// Sample mock users data
const mockUsers = [
  {
    _id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    lastLogin: new Date("2024-02-10"),
    createdAt: new Date("2024-01-15")
  },
  {
    _id: "user2",
    name: "Jane Smith", 
    email: "jane@example.com",
    role: "user",
    lastLogin: new Date("2024-02-09"),
    createdAt: new Date("2024-01-20")
  },
  {
    _id: "admin1",
    name: "Admin User",
    email: "admin@example.com", 
    role: "admin",
    lastLogin: new Date("2024-02-10"),
    createdAt: new Date("2024-01-01")
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
