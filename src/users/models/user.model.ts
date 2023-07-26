import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { CommentLike } from 'src/comment/models/comment-like.model';
import { Comment } from 'src/comment/models/comment.model';
import { PhotoLike } from 'src/photo/models/photo-like.model';
import { Photo } from 'src/photo/models/photo.model';
import { UserPhoto } from 'src/photo/models/user_photo.model';
import { Role } from 'src/roles/models/role.model';
import { UserRoles } from 'src/roles/models/user-roles.model';
import { UserComment } from './user-comment.model';

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

  @BelongsToMany(() => Comment, () => UserComment)
  photoComments: Comment[];

  @BelongsToMany(() => Comment, () => CommentLike)
  likedComments: Comment[];

  @BelongsToMany(() => Photo, () => PhotoLike)
  likedPhotos: Photo[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
