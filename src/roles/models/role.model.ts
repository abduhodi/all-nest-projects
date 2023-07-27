import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { UserRoles } from './user-roles.model';

interface RolesAtrribute {
  name: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RolesAtrribute> {
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
    set(val: string) {
      this.setDataValue('name', val.toUpperCase());
    },
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    set(val: string) {
      this.setDataValue('description', val.toUpperCase());
    },
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
