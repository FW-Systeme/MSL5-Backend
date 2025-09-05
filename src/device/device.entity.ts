import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  object: string;

  @Column()
  isActive: boolean;

  @Column()
  manufacturer: string;

  @Column()
  postalcode: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  period: number;
}