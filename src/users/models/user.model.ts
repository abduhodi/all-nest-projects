import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserComment } from './user-comment.model';
import { Comment } from '../../comment/models/comment.model';
import { CommentLike } from '../../comment/models/comment-like.model';
import { Role } from '../../roles/models/role.model';
import { UserRoles } from '../../roles/models/user-roles.model';
import { UserPost } from '../../photo/models/user_post.model';
import { PostLike } from '../../photo/models/post-like.model';
import { Posts } from '../../photo/models/post.model';

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

  @BelongsToMany(() => Posts, () => UserPost)
  posts: Posts[];

  @BelongsToMany(() => Comment, () => UserComment)
  postComments: Comment[];

  @BelongsToMany(() => Comment, () => CommentLike)
  likedComments: Comment[];

  @BelongsToMany(() => Posts, () => PostLike)
  likedPosts: Posts[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
