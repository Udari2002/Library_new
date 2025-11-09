import User from '../models/User.js';

export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email role lastLogin createdAt');
    return res.json(users);
  } catch (err) {
    console.error('listUsers error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
