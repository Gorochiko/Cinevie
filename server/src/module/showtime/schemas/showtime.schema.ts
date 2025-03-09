import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) 
export class Showtime extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Flim', required: true })
  films: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Theater', required: true })
  theater: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({Type:String ,enum:['active','closed'] , default:'active'})
  status:string;
}

export const ShowtimeSchema = SchemaFactory.createForClass(Showtime);
