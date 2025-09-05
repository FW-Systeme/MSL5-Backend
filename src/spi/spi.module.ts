import { Module } from '@nestjs/common';
import { SpiService } from './spi.service';
import { SpiController } from './spi.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
  ],
  controllers: [SpiController],
  providers: [SpiService],
})
export class SpiModule {}
