"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
// User routes
router.get("/groceries", user_controller_1.UserController.viewGroceries);
router.post("/order", user_controller_1.UserController.bookGrocery);
exports.default = router;
//# sourceMappingURL=user.routes.js.map