import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlockDocument = HydratedDocument<Block>;

export class Block {
  @Prop()
  blockNumber: number;

  @Prop()
  description: string;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
