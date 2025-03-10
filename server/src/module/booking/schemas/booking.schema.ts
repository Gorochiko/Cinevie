import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



@Schema({ timestamps: true }) 
export class Booking extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Showtime', required: true })
    showtimeId: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId:Types.ObjectId

    @Prop({type:Array})

    @Prop({ type: Types.ObjectId, ref: 'Food', required: true })
    foodId:Types.ObjectId

    @Prop({required:true})
    totalPrice:number

    @Prop({ type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' })
    status: string;
}
