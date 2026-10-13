import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoutes from "./routes/health.routes.js";
import notFoundMiddleware from "./middleware/not-found.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to BlogSphere API",
  });
});

app.use("/api/v1/health", healthRoutes);

// Register feature routes here as we build them.
// Example: app.use("/api/v1/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
