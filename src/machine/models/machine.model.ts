import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';
import { Driver } from 'src/driver/models/driver.model';
import { MachineDriver } from 'src/machine_driver/models/machine_driver.model';

interface MachineAttribute {
  name: string;
  companyId: number;
}

@Table({ tableName: 'machine' })
export class Machine extends Model<Machine, MachineAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING(50),
  })
  name: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Driver, () => MachineDriver)
  drivers: Driver[];
}
