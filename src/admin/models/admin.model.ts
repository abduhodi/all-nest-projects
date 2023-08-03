import { ApiTags } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttribute {
  name: string;
  login: string;
  hashedPassword: string;
  isActive: boolean;
  isCreator: boolean;
  hashedRefreshToken: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashedPassword: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isCreator: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  hashedRefreshToken: string;
}
