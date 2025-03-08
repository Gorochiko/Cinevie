import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true }) 
export class Showtime extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Flim', required: true })
  film: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Theater', required: true })
  theater: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;
}

export const ShowtimeSchema = SchemaFactory.createForClass(Showtime);
