import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  tgLink: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop()
  hashedToken: string;

  @Prop()
  activationLink: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isCreator: boolean;

  @Prop()
  description: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
