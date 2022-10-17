import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import supertokens from 'supertokens-node';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { readFileSync } from "fs";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SupertokensExceptionFilter } from "./auth/auth.filter";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Api Lab 4')
    .setDescription('The lab API description')
    .setVersion('1.0')
    .build();

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
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(port);
}
bootstrap();
