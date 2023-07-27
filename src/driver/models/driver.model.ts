import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Machine } from '../../machine/models/machine.model';
import { MachineDriver } from '../../machine_driver/models/machine_driver.model';

interface DriverAttribute {
  first_name: string;
  last_name: string;
}

@Table({
  tableName: 'driver',
})
export class Driver extends Model<Driver, DriverAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING(35),
  })
  first_name: string;
  @Column({
    type: DataType.STRING(35),
  })
  last_name: string;

  @BelongsToMany(() => Machine, () => MachineDriver)
  machines: Machine[];
}
