import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/models/comment.model';
import { CommentLike } from './comment/models/comment-like.model';
import { Role } from './roles/models/role.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/models/user-roles.model';
import { JwtModule } from '@nestjs/jwt';
import { UserComment } from './users/models/user-comment.model';
import { UserPost } from './photo/models/user_post.model';
import { PostLike } from './photo/models/post-like.model';
import { Asset } from './assets/models/assets.model';
import { AssetModule } from './assets/assets.module';
import { PostModule } from './photo/post.module';
import { Posts } from './photo/models/post.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.db_host,
      port: +process.env.db_port,
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_database,
      models: [
        User,
        Posts,
        UserPost,
        Comment,
        CommentLike,
        PostLike,
        Role,
        UserRoles,
        UserComment,
        Asset,
      ],
      logging: false,
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    CommentModule,
    RolesModule,
    AssetModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
