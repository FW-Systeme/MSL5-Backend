import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Device {
  _id?: string;

  @Prop(String)
  name: string;

  @Prop(String)
  description: string;

  @Prop(Date)
  createdAt: Date;

  @Prop(Boolean)
  isActive: boolean;

  @Prop(String)
  manufacturer: string;

  @Prop(String)
  object: string;

  @Prop(String)
  city: string;

  @Prop(String)
  street: string;

  @Prop(String)
  postalcode: string;

  @Prop(Number)
  period: number;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
export type DeviceDocument = Device & Document;