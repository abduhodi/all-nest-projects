import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Photo } from './photo.model';

// interface UserPhotoAttribute {
//   userId: number;
//   photoId: number;
// }

@Table({ tableName: 'user_photo' })
export class UserPhoto extends Model<UserPhoto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Photo)
  @Column({
    type: DataType.INTEGER,
  })
  photoId: number;
}
