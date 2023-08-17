import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false })
export class FarmAnimal extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Animal', required: true })
  animalId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Farm', required: true })
  farmId: Types.ObjectId;
}

export const FarmAnimalSchema = SchemaFactory.createForClass(FarmAnimal);
