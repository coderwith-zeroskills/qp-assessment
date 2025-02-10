"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
// Admin routes
router.post("/add-grocery", admin_controller_1.AdminController.addGrocery);
router.get("/groceries", admin_controller_1.AdminController.viewGroceries);
router.delete("/groceries/:id", admin_controller_1.AdminController.removeGrocery);
router.put("/groceries/:id", admin_controller_1.AdminController.updateGrocery);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map