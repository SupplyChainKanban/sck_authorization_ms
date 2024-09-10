import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function main() {

  const logger = new Logger('Authorization_ms');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.sckNatsServers,
      }
    }
  );
  await app.listen();
  logger.log(`Authorization microservice is running on port ${envs.port}`)
}
main();
