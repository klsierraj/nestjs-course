import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import './config/dotenv.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('Hello World example')
    .setDescription('The Hello World API description')
    .setVersion('1.0')
    .addTag('hello-world')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get<number>('config.port'));
}

bootstrap();
