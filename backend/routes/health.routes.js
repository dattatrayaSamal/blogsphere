import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    message: databaseConnected
      ? "BlogSphere API is healthy"
      : "Database connection is unavailable",
    data: {
      database: databaseConnected ? "connected" : "disconnected",
    },
  });
});

export default router;
