import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Photo } from 'src/photo/models/photo.model';
import { UserPhoto } from 'src/photo/models/user_photo.model';

interface UserAttribute {
  name: string;
  username: string;
  password: string;
}

@Table({
  tableName: 'user',
})
export class User extends Model<User, UserAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @BelongsToMany(() => Photo, () => UserPhoto)
  photos: Photo[];
}
