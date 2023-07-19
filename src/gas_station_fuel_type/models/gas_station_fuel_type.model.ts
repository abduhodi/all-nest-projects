import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { FuelType } from 'src/fuel_type/models/fuel_type.model';
import { GasStationBranch } from 'src/gas_station_branch/models/gas_station_branch.model';

interface GasStationFuelTypeAttribute {
  gasStationBranchId: number;
  fuelTypeId: number;
  price: number;
  exist: boolean;
}

@Table({ tableName: 'gas_station_fuel_type' })
export class GasStationFuelType extends Model<
  GasStationFuelType,
  GasStationFuelTypeAttribute
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  exist: boolean;

  @ForeignKey(() => FuelType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fuelTypeId: number;

  @BelongsTo(() => FuelType)
  fuelType: FuelType;

  @ForeignKey(() => GasStationBranch)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  gasStationBranchId: number;

  @BelongsTo(() => GasStationBranch)
  gasStationBranche: GasStationBranch;
}
