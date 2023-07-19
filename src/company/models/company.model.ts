import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Builder } from 'src/builder/models/builder.model';
import { Machine } from 'src/machine/models/machine.model';

interface CompanyAttributes {
  name: string;
  address: string;
  phone: string;
}

@Table({ tableName: 'company' })
export class Company extends Model<Company, CompanyAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @HasMany(() => Builder)
  bulders: Builder[];

  @HasMany(() => Machine)
  machines: Machine[];
}
