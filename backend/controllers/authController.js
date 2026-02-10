import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // BYPASS DATABASE - Accept any registration
    console.log("🔓 Registration bypassed - accepting any user");
    
    const mockUser = {
      _id: "mock_user_id_" + Date.now(),
      name: name,
      email: email,
      role: role
    };

    res.status(201).json(mockUser);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // BYPASS DATABASE - Accept any login
    console.log("🔓 Login bypassed - accepting any credentials");
    
    const mockUser = {
      _id: "mock_user_id_" + Date.now(),
      name: email.split('@')[0], // Use email prefix as name
      email: email,
      role: "user",
      lastLogin: new Date()
    };

    const token = jwt.sign(
      { sub: mockUser._id, role: mockUser.role, email: mockUser.email },
      process.env.JWT_SECRET || "fallback_jwt_secret_for_demo",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: mockUser
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    // Always return a generic message to avoid revealing account existence
    if (!user) return res.json({ message: "If an account with that email exists, a reset link was sent." });

    // Create a short-lived token for password reset (in production, send via email)
    const resetToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // TODO: send email with reset link containing the token. For now return token for dev use.
    return res.json({ message: "Password reset token generated.", resetToken });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { name, email, phone, avatarBase64 } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (avatarBase64) updates.avatarBase64 = avatarBase64;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ user });
  } catch (err) {
    console.error('updateProfile error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
