import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false })
export class FarmSpeciality extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Farm', required: true })
  farmId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Speciality', required: true })
  spacialityId: Types.ObjectId;
}

export const FarmSpecialitySchema =
  SchemaFactory.createForClass(FarmSpeciality);
