import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { readFileSync } from "fs";

async function bootstrap() {
  const port = process.env.PORT || 8888;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', '/public'));
  app.setBaseViewsDir(join(__dirname, '..', '/views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partial'));
  hbs.registerPartial('content', function(contentName) {
    return readFileSync(join(__dirname, '..', '/views/content', contentName + '.hbs'), 'utf8')
  });
  hbs.registerHelper('if_eq', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  await app.listen(port);
}
bootstrap();
