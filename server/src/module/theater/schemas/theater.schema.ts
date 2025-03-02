import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Theater extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  address: string;

}
export const TheaterSchema = SchemaFactory.createForClass(Theater);
