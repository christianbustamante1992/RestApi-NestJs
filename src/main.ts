import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Rest Api NestJs')
    .setDescription('Proyecto de Practica')
    .setVersion('1.0')
    .addTag('practica')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentacion', app, document);

  await app.listen(3000);
}
bootstrap();
