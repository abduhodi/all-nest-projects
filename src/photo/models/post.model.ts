import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Comment } from '../../comment/models/comment.model';
import { PostLike } from './post-like.model';
import { UserPost } from './user_post.model';
import { Asset } from '../../assets/models/assets.model';

interface PostAttribute {
  // userId: number;
  main: string;
  title: string;
  description: string;
}

@Table({ tableName: 'post' })
export class Posts extends Model<Posts, PostAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  // @ForeignKey(() => Assets)
  @Column({
    type: DataType.STRING,
  })
  main: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Asset)
  assets: Asset[];

  @BelongsToMany(() => User, () => UserPost)
  authors: User[];

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => User, () => PostLike)
  likes: User[];
}
