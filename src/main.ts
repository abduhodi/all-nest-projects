import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('FARM')
      .setDescription('The Farm API description')
      .setVersion('1.0')
      .addTag('NESTJS, MONGOOSE')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
    await app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}
start();
