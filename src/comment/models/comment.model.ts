import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CommentLike } from './comment-like.model';
import { User } from '../../users/models/user.model';
import { UserComment } from '../../users/models/user-comment.model';
import { Posts } from '../../photo/models/post.model';

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

  @ForeignKey(() => Posts)
  @Column({
    type: DataType.INTEGER,
  })
  photoId: number;

  @Column({
    type: DataType.TEXT,
  })
  text: string;

  @BelongsToMany(() => User, () => UserComment)
  users: User[];

  @BelongsTo(() => Posts)
  photo: Posts;

  @BelongsToMany(() => User, () => CommentLike)
  likes: User[];
}
