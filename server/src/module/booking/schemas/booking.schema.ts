import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) 
export class Booking extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Showtime', required: true })
    showtime: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user:Types.ObjectId

    @Prop({type:Array,required:true ,default:[]})
    seats:string[]

    @Prop({ type: [Types.ObjectId], ref: 'Food', required: true , default:[]})
    food:Types.ObjectId[]

    @Prop({required:true})
    totalPrice:number

    @Prop({ type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' })
    status: string;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);
