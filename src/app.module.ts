import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { VenueModule } from './venue/venue.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { Venue } from './venue/models/venue.model';
import { Admin } from './admin/models/admin.model';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';
import { VenuePhoto } from './venue_photo/models/venue_photo.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VenueTypeModule } from './venue_type/venue_type.module';
import { VenueType } from './venue_type/models/venue_type.model';
import { VenueTypeVenue } from './venue_type/models/venue_type_venue.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [Venue, Admin, VenuePhoto, VenueType, VenueTypeVenue],
      autoLoadModels: true,
      logging: false,
    }),
    VenueModule,
    AdminModule,
    AuthModule,
    VenuePhotoModule,
    VenueTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
