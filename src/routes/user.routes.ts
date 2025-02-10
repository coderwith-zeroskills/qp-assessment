import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

// User routes
router.get("/groceries", UserController.viewGroceries);
router.post("/order", UserController.bookGrocery);

export default router;
