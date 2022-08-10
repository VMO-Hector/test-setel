import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  _setupSwagger(app);
  _setupSwagger(app);
  await app.listen(config.port);
}

async function _setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(config.swagger.title)
    .setDescription(config.swagger.description)
    .setVersion(config.swagger.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  try {
    const outputSwaggerFile = `${process.cwd()}/output-specs/${
      config.serviceName
    }.json`;
    fs.writeFileSync(outputSwaggerFile, JSON.stringify(document, null, 2), {
      encoding: 'utf8',
    });
  } catch (e) {
    console.warn(`Could not save swagger docs into file: ${e}`);
  }
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: config.swagger.title,
  });
}
bootstrap();
