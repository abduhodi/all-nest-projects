import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MachineDriverController } from './machine_driver.controller';
import { MachineDriverService } from './machine_driver.service';
import { MachineDriver } from './models/machine_driver.model';

@Module({
  imports: [SequelizeModule.forFeature([MachineDriver])],
  controllers: [MachineDriverController],
  providers: [MachineDriverService],
})
export class MachineDriverModule {}
