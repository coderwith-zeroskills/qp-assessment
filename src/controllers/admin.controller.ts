import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Grocery } from "../models/grocery.model";

export class AdminController {
  // Add new grocery item
  static async addGrocery(req: Request, res: Response) {
    const { name, price, description, inventory } = req.body;
    const grocery = new Grocery();
    grocery.name = name;
    grocery.price = price;
    grocery.description = description;
    grocery.inventory = inventory;

    try {
      await AppDataSource.getRepository(Grocery).save(grocery);
      res.status(201).json(grocery);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error adding grocery item", error: err });
    }
  }

  // View all grocery items
  static async viewGroceries(req: Request, res: Response) {
    try {
      const groceries = await AppDataSource.getRepository(Grocery).find();
      res.status(200).json(groceries);
    } catch (err) {
      res.status(400).json({ message: "Error fetching groceries", error: err });
    }
  }

  static removeGrocery = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    try {
      const grocery = await AppDataSource.getRepository(Grocery).findOneBy({
        id: Number(id),
      });
      if (!grocery) {
        return res.status(404).json({ message: "Grocery not found" });
      }
      await AppDataSource.getRepository(Grocery).remove(grocery);
      return res.status(200).json({ message: "Grocery removed successfully" });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error removing grocery", error: err });
    }
  };

  // Update grocery item
  static updateGrocery = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;
    const { name, price, description, inventory } = req.body;

    try {
      const grocery = await AppDataSource.getRepository(Grocery).findOneBy({
        id: Number(id),
      });
      if (!grocery) {
        return res.status(404).json({ message: "Grocery not found" });
      }

      grocery.name = name || grocery.name;
      grocery.price = price || grocery.price;
      grocery.description = description || grocery.description;
      grocery.inventory = inventory || grocery.inventory;

      await AppDataSource.getRepository(Grocery).save(grocery);
      return res.status(200).json(grocery);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error updating grocery", error: err });
    }
  };
}
