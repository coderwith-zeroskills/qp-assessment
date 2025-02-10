import express from "express";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import { AppDataSource } from "./config/db";
import "reflect-metadata"; // Required for TypeORM decorators

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Admin and User routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

// Start the server and database connection
AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => console.log("Database connection failed:", err));
