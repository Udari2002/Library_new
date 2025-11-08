const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Library backend running" });
});

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
