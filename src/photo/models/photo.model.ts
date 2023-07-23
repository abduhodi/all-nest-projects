import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { UserPhoto } from './user_photo.model';

interface PhotoAttribute {
  link: string;
  title: string;
  userId: number;
}

@Table({ tableName: 'photo' })
export class Photo extends Model<Photo, PhotoAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  link: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @BelongsToMany(() => User, () => UserPhoto)
  users: User[];
}
