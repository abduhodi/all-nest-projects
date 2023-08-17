import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Speciality } from '../../speciality/schemas/speciality.schema';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema({ versionKey: false })
export class Worker {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  experience: number;

  @Prop()
  phoneNumber: string;

  @Prop()
  username: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' })
  speciality: Speciality;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
