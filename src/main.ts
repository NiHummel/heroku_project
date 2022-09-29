import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const port = process.env.PORT || 8888;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '/public'));
  app.setBaseViewsDir(join(__dirname, '..', '/views'));
  app.setViewEngine('hbs');
  await app.listen(port);
}
bootstrap();
