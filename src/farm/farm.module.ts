import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Farm, FarmSchema } from './schemas/farm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farm.name, schema: FarmSchema }]),
  ],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
