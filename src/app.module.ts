import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PhotoModule } from './photo/photo.module';
import { User } from './users/models/user.model';
import { Photo } from './photo/models/photo.model';
import { UserPhoto } from './photo/models/user_photo.model';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/models/comment.model';
import { CommentLike } from './comment/models/comment-like.model';
import { PhotoLike } from './photo/models/photo-like.model';
import { Role } from './roles/models/role.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/models/user-roles.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
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
        Photo,
        UserPhoto,
        Comment,
        CommentLike,
        PhotoLike,
        Role,
        UserRoles,
      ],
      logging: false,
      autoLoadModels: true,
    }),
    UsersModule,
    PhotoModule,
    AuthModule,
    CommentModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
