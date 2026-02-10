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
    origin: true, // Allow all origins for now (can be restricted later)
    credentials: true
  }));
  
  app.use(express.json());

  app.get("/", (_req, res) => res.send("📚 Library API Running"));

  // ✅ Make sure these are here
  app.use("/api/auth", authRoutes);
  app.use("/api/books", bookRoutes);
  app.use("/api/borrows", borrowRoutes);

  // Smart port handling - try multiple ports if needed
  const startPort = process.env.PORT || 5001;
  const tryPorts = [startPort, 5001, 5002, 5003, 3001];
  
  let server;
  for (const port of tryPorts) {
    try {
      server = await new Promise((resolve, reject) => {
        const srv = app.listen(port, () => {
          console.log(`🚀 Server successfully running on http://localhost:${port}`);
          console.log(`📡 API endpoints available at http://localhost:${port}/api`);
          resolve(srv);
        }).on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            console.log(`⚠️  Port ${port} is busy, trying next port...`);
            reject(err);
          } else {
            console.error(`❌ Server error on port ${port}:`, err.message);
            reject(err);
          }
        });
      });
      break; // Successfully started
    } catch (err) {
      if (err.code !== 'EADDRINUSE' || port === tryPorts[tryPorts.length - 1]) {
        console.error(`❌ Failed to start server after trying all ports:`, err.message);
        process.exit(1);
      }
    }
  }
};

startServer();
