import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


interface Seat {
  seatNumber: string; 
  status?: 'available' | 'booked' | 'reserved';
}

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ required: true }) 
  name: string; 

  @Prop({ type: [{ 
    seatNumber: { type: String, required: true },
    status: { type: String, enum: ['available', 'booked', 'reserved'], default: 'available' }
  }], default: [] })
  seats: Seat[]; 

  @Prop({ type: String, enum: ['2D', '3D', 'IMAX', '4DX'], default: '2D' }) 
  screenType: string;

  @Prop({ type: Number, required: true }) 
  capacity: number;

  @Prop({ type: Boolean, default: true }) 
  isActive: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);