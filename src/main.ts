import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { SpiModule } from './spi/spi.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const redis = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: { host: 'localhost', port: 6379 }
  });
  redis.useLogger(logger);
  redis.listen().then(_ => logger.debug(`Redis connected`)).catch(e => logger.error(e));
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
