import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Document } from "mongoose";

export class Device {
  Bus: number;
  Chip: number;
}

export class Entry {
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

  @Prop({type: Device})
  device: Device;

  @Prop({type: String, enum: SPI_TYPE})
  spiType: SPI_TYPE;

  @Prop({type: String, enum: ["IN", "OUT"]})
  analogType: "IN" | "OUT";

  @Prop({type: [Entry], default: []})
  entries: Entry[];

  @Prop({type: Date, default: new Date()})
  createdAt: Date;
}

// export type SPI_TYPE = "0-10V" | "0.4-2V" | "0-20mA" | "4-20mA";

export const AnalogSchema = SchemaFactory.createForClass(Analog);
export type AnalogDocument = Analog & Document;

export interface ANALOG {

}