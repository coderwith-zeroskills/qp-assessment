import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Grocery } from "../models/grocery.model";
import { Order } from "../models/order.model";

export class UserController {
  // View all grocery items
  static async viewGroceries(req: Request, res: Response) {
    try {
      const groceries = await AppDataSource.getRepository(Grocery).find();
      res.status(200).json(groceries);
    } catch (err) {
      res.status(400).json({ message: "Error fetching groceries", error: err });
    }
  }

  // Book grocery items
  static async bookGrocery(req: Request, res: Response) {
    const { groceries } = req.body; // List of grocery items with quantity

    try {
      const orderItems: Order[] = [];
      let totalPrice = 0;

      for (const item of groceries) {
        const grocery = await AppDataSource.getRepository(Grocery).findOneBy({ id: item.id });
        if (!grocery) {
          return res.status(404).json({ message: `Grocery with id ${item.id} not found` });
        }
        const order = new Order();
        order.grocery = grocery;
        order.quantity = item.quantity;
        order.totalPrice = grocery.price * item.quantity;
        order.status = "pending";

        await AppDataSource.getRepository(Order).save(order);
        orderItems.push(order);
        totalPrice += order.totalPrice;
      }

      res.status(201).json({ message: "Order placed successfully", orderItems, totalPrice });
    } catch (err) {
      res.status(400).json({ message: "Error placing order", error: err });
    }
  }
}
