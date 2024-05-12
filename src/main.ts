import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, transformOptions: {
      enableImplicitConversion: true
    }
  }));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Project X API')
    .setDescription('API for the Project X')
    .setVersion(process.env.APPLICATION_VERSION || '1.0.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({ origin: '*' });
  // app.use(bodyParser.json({limit: '50mb'}));
  // app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));
  await app.listen(process.env.PORT);
  Logger.log(`Listening on ${process.env.PORT}`);
}
bootstrap();
