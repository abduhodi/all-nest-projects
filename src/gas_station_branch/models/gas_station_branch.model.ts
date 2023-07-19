import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { GasStation } from 'src/gas_station/models/gas_station.model';
import { GasStationFuelType } from 'src/gas_station_fuel_type/models/gas_station_fuel_type.model';

interface GasStationBranchAttribute {
  gasStationId: number;
  branchName: string;
  address: string;
  location: string;
  phoneNumber: string;
}

@Table({
  tableName: 'gas_station_branch',
})
export class GasStationBranch extends Model<
  GasStationBranch,
  GasStationBranchAttribute
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  branchName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  address: string;
  location: string;
  phoneNumber: string;

  @ForeignKey(() => GasStation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  gasStationId: number;

  @BelongsTo(() => GasStation)
  mainGasStation: GasStation;

  @HasMany(() => GasStationFuelType)
  gasStationFuelTypes: GasStationFuelType[];
}
