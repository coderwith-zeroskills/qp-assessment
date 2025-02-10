import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Grocery } from "./grocery.model";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Grocery)
  grocery!: Grocery;

  @Column()
  quantity!: number;

  @Column("decimal")
  totalPrice!: number;

  @Column()
  status!: string;  // e.g., 'pending', 'completed'
}
