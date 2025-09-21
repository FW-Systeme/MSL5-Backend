import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Device {
  @Column({nullable: true})
  Bus: number;
  @Column({nullable: true})
  Chip: number;
}

@Entity()
export class ANALOG {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  Type: string;

  @Column(() => Device)
  Device: Device;

  @OneToMany(() => Entry, (entry) => entry.analog, {eager: true, nullable: false})
  Entries: Entry[];

  @Column()
  AnalogType: "IN" | "OUT";

  @CreateDateColumn()
  createdAt: Date;
}

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id?: number;
  @ManyToOne(() => ANALOG, (analog) => analog.Entries)
  analog: ANALOG;
  @Column()
  Number: number;
  @Column()
  AnalogValue: number;
  @Column()
  Factor: number;
  @Column()
  Value: number;
  @Column()
  LowerBound: number;
  @Column()
  UpperBound: number;
  @Column()
  Type: SPI_TYPE;
  @Column()
  IsLogging: boolean;
}

export type SPI_TYPE = "0-10V" | "0.4-2V" | "0-20mA" | "4-20mA";
