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
exports.AdminController = void 0;
const db_1 = require("../config/db");
const grocery_model_1 = require("../models/grocery.model");
class AdminController {
    // Add new grocery item
    static addGrocery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, description, inventory } = req.body;
            const grocery = new grocery_model_1.Grocery();
            grocery.name = name;
            grocery.price = price;
            grocery.description = description;
            grocery.inventory = inventory;
            try {
                yield db_1.AppDataSource.getRepository(grocery_model_1.Grocery).save(grocery);
                res.status(201).json(grocery);
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Error adding grocery item", error: err });
            }
        });
    }
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
    // Remove grocery item
    static removeGrocery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return db_1.AppDataSource.getRepository(grocery_model_1.Grocery)
                .findOneBy({ id: Number(id) })
                .then((grocery) => {
                if (!grocery) {
                    return res.status(404).json({ message: "Grocery not found" });
                }
                return db_1.AppDataSource.getRepository(grocery_model_1.Grocery)
                    .remove(grocery)
                    .then(() => res.status(200).json({ message: "Grocery removed successfully" }));
            })
                .catch((err) => {
                return res
                    .status(400)
                    .json({ message: "Error removing grocery", error: err });
            });
        });
    }
    // Update grocery item
    static updateGrocery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, price, description, inventory } = req.body;
            try {
                const grocery = yield db_1.AppDataSource.getRepository(grocery_model_1.Grocery).findOneBy({
                    id: Number(id),
                });
                if (!grocery) {
                    return res.status(404).json({ message: "Grocery not found" });
                }
                grocery.name = name || grocery.name;
                grocery.price = price || grocery.price;
                grocery.description = description || grocery.description;
                grocery.inventory = inventory || grocery.inventory;
                yield db_1.AppDataSource.getRepository(grocery_model_1.Grocery).save(grocery);
                res.status(200).json(grocery);
            }
            catch (err) {
                res.status(400).json({ message: "Error updating grocery", error: err });
            }
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map