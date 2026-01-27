import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

dotenv.config();

const startServer = async () => {
  console.log('🔍 Starting server with MONGO_URI:', process.env.MONGO_URI);
  console.log('🔍 PORT:', process.env.PORT);
  
  await connectDB();

  const app = express();
  
  // Configure CORS to allow frontend access
  app.use(cors({
    origin: ['http://44.198.192.218:3000', 'http://localhost:3000'],
    credentials: true
  }));
  
  app.use(express.json());

  app.get("/", (_req, res) => res.send("📚 Library API Running"));

  // ✅ Make sure these are here
  app.use("/api/auth", authRoutes);
  app.use("/api/books", bookRoutes);
  app.use("/api/borrows", borrowRoutes);

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
};

startServer();
