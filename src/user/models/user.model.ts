import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../roles/models/role.model';
import { UserRoles } from '../../roles/models/user-roles.model';
import { Post } from '../../posts/models/post.model';

interface UserAttribute {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttribute> {
  @ApiProperty({ example: '1', description: 'user id' })
  @ApiProperty({ example: '1', description: 'user id' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'akmal', description: 'name of user' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'akmal@example.com', description: 'email of user' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'password1234', description: 'password of user' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  // @ApiProperty({ example: 'f', description: "user active or not" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}
