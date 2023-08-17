import { Module } from '@nestjs/common';
import { FarmAnimalsService } from './farm-animals.service';
import { FarmAnimalsController } from './farm-animals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmAnimal, FarmAnimalSchema } from './schemas/farm-animal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FarmAnimal.name, schema: FarmAnimalSchema },
    ]),
  ],
  controllers: [FarmAnimalsController],
  providers: [FarmAnimalsService],
})
export class FarmAnimalsModule {}
