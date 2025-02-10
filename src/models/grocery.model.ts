import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal")
  price!: number;

  @Column()
  description!: string;

  @Column()
  inventory!: number;
}
