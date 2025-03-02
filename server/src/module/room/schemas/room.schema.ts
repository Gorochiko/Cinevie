import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })

export class Room extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true })
  theater: mongoose.Types.ObjectId;

  @Prop({ type: [String], default: [] })
  seats: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);