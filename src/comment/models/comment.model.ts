import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Photo } from 'src/photo/models/photo.model';
import { User } from 'src/users/models/user.model';
import { CommentLike } from './comment-like.model';

interface CommentAttribute {
  userId: number;
  photoId: number;
  text: string;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentAttribute> {
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

  @Column({
    type: DataType.TEXT,
  })
  text: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Photo)
  photo: Photo;

  @BelongsToMany(() => User, () => CommentLike)
  likes: User[];
}
