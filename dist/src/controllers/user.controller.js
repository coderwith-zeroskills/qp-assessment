"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const db_1 = require("../config/db");
const grocery_model_1 = require("../models/grocery.model");
const order_model_1 = require("../models/order.model");
class UserController {
    // View all grocery items
    static viewGroceries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groceries = yield db_1.AppDataSource.getRepository(grocery_model_1.Grocery).find();
                res.status(200).json(groceries);
            }
            catch (err) {
                res.status(400).json({ message: "Error fetching groceries", error: err });
            }
        });
    }
    // Book grocery items
    static bookGrocery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { groceries } = req.body; // List of grocery items with quantity
            try {
                const orderItems = [];
                let totalPrice = 0;
                for (const item of groceries) {
                    const grocery = yield db_1.AppDataSource.getRepository(grocery_model_1.Grocery).findOneBy({ id: item.id });
                    if (!grocery) {
                        return res.status(404).json({ message: `Grocery with id ${item.id} not found` });
                    }
                    const order = new order_model_1.Order();
                    order.grocery = grocery;
                    order.quantity = item.quantity;
                    order.totalPrice = grocery.price * item.quantity;
                    order.status = "pending";
                    yield db_1.AppDataSource.getRepository(order_model_1.Order).save(order);
                    orderItems.push(order);
                    totalPrice += order.totalPrice;
                }
                res.status(201).json({ message: "Order placed successfully", orderItems, totalPrice });
            }
            catch (err) {
                res.status(400).json({ message: "Error placing order", error: err });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map