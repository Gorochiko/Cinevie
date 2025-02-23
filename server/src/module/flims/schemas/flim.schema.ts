import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type FlimDocument = HydratedDocument<Flim>;
@Schema({ timestamps: true })
export class Flim {
    _id: Types.ObjectId;
    @Prop({required:true})
    title: string;

    @Prop({required:true})
    age: string;

    @Prop({required:true})
    timeLength:number;

    @Prop({required: true})
    year: number;

    @Prop({require:true})
    onStage: Date;

    @Prop({required:true}) 
    description:string;

    @Prop({required:true})
    image:string

}
export const FlimSchema = SchemaFactory.createForClass(Flim);