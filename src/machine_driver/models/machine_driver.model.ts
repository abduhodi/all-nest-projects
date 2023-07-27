import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Machine } from '../../machine/models/machine.model';
import { Driver } from '../../driver/models/driver.model';

interface MachineDriverAttribute {
  machineId: number;
  driverId: number;
}

@Table({
  tableName: 'machine_driver',
  timestamps: false,
})
export class MachineDriver extends Model<
  MachineDriver,
  MachineDriverAttribute
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Machine)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  machineId: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  driverId: number;
}
