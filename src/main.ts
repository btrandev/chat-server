import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './nest/adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
    },
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, transformOptions: {
      enableImplicitConversion: true
    }
  }));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Chat Server')
    .setDescription('Chat Socket Server')
    .setVersion(process.env.APPLICATION_VERSION || '1.0.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({ origin: '*' });
  
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(process.env.PORT);
  Logger.log(`Listening on ${process.env.PORT}`);
}
bootstrap();
