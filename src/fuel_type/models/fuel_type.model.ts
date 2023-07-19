import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { GasStationFuelType } from 'src/gas_station_fuel_type/models/gas_station_fuel_type.model';

interface FuelTypeAttribute {
  name: string;
}

@Table({ tableName: 'fuel_type', timestamps: false })
export class FuelType extends Model<FuelType, FuelTypeAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => GasStationFuelType)
  gasStations: GasStationFuelType[];
}
