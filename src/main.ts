import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  const options = new DocumentBuilder()
    .setTitle('Rest Api NestJs')
    .setDescription('Proyecto de Practica')
    .setVersion('1.0')
    .addTag('practica')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentacion', app, document);

  app.enableCors();

  await app.listen(process.env.PORT);

  logger.log(`Server is running at ${await app.getUrl()}`);
}

bootstrap();
