import { Module } from '@nestjs/common';
import { GasStationBranchController } from './gas_station_branch.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GasStationBranch } from './models/gas_station_branch.model';
import { GasStationBranchService } from './gas_station_branch.service';

@Module({
  imports: [SequelizeModule.forFeature([GasStationBranch])],
  controllers: [GasStationBranchController],
  providers: [GasStationBranchService],
})
export class GasStationBranchModule {}
