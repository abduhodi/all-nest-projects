import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from './pipe/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3003;

    // Validation Middleware
    app.useGlobalPipes(new ValidationPipe());

    // Swagger setup
    const config = new DocumentBuilder()
      .setTitle('Nest-One')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NestJs, Postgres, Sequelize')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    // Server listen
    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();
