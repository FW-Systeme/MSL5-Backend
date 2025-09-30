import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Document } from "mongoose";

export class Device {
  Bus: number;
  Chip: number;
}

export class Value {
  val: number;
  time: number;
}

export enum SPI_TYPE {
    "0-10V",
    "0.4-2V",
    "0-20mA",
    "4-20mA"
}

@Schema()
export class Analog {
  _id?: ObjectId;

  @Prop(String)
  name: string;

  @Prop({type: Device})
  device: Device;

  @Prop({type: String})
  type: string;

  @Prop({type: String, enum: ["IN", "OUT"]})
  analogType: "IN" | "OUT";

  @Prop({type: [Value], default: []})
  values: Value[];

  @Prop({type: Date, default: () => new Date()})
  createdAt: Date;

  @Prop(Number)
  number: number;

  @Prop({type: String, enum: SPI_TYPE})
  spiType: SPI_TYPE;

  @Prop(String)
  unit: string;

  @Prop({type: Boolean, default: false})
  isLogging: boolean;

  @Prop({type: Number})
  lowerBound: number;

  @Prop({type: Number})
  upperBound: number;

  @Prop({type: Number})
  factor: number;
}

// export type SPI_TYPE = "0-10V" | "0.4-2V" | "0-20mA" | "4-20mA";

export const AnalogSchema = SchemaFactory.createForClass(Analog);
export type AnalogDocument = Analog & Document;

export interface ENTRY {
  Number: number;
  AnalogValue: number;
  Factor: number;
  Value: number;
  LowerBound: number;
  UpperBound: number;
  Unit: string;
  Type: SPI_TYPE;
  IsLogging: boolean;
}

export interface ANALOG_DATA {
  Type: string;
  Device: Device;
  Entries: ENTRY[];
  analogType: "IN" | "OUT";
}