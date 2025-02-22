import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ["src/models/*.ts"],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed: ", err));
