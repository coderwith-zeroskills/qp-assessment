import express from "express";
import { AdminController } from "../controllers/admin.controller";

const router = express.Router();

// Admin routes
router.post("/add-grocery", AdminController.addGrocery);
router.get("/groceries", AdminController.viewGroceries);
router.delete("/groceries/:id", AdminController.removeGrocery);
router.put("/groceries/:id", AdminController.updateGrocery);

export default router;
