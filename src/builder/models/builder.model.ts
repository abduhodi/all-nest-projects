import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from '../../company/models/company.model';

interface BuilderAttribute {
  full_name: string;
  birth_day: Date;
  salary: number;
  companyId: number;
}

@Table({ tableName: 'builder' })
export class Builder extends Model<Builder, BuilderAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birth_day: Date;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  salary: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
