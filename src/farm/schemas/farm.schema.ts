import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type FarmDocument = HydratedDocument<Farm>;

@Schema({ versionKey: false })
export class Farm extends Document {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 200 })
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'Worker', required: true })
  ownerId: Types.ObjectId;

  @Prop({ required: true })
  phone: string;
}

export const FarmSchema = SchemaFactory.createForClass(Farm);
