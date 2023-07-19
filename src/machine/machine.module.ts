import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

@Module({
  imports: [SequelizeModule.forFeature([Machine])],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
