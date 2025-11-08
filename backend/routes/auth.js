const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const DATA_DIR = path.join(__dirname, "..", "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (e) {
    return [];
  }
}

function writeUsers(users) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const users = readUsers();
  if (users.some((u) => u.email === email)) return res.status(409).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, password: hashed, role };
  users.push(user);
  writeUsers(users);

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  const users = readUsers();
  const found = users.find((u) => u.email === email);
  if (!found) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, found.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: found.id, role: found.role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ user: { id: found.id, name: found.name, email: found.email, role: found.role }, token });
});

module.exports = router;
