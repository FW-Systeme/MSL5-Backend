import { Module } from '@nestjs/common';
import { SpiService } from './spi.service';
import { SpiController } from './spi.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ANALOG_IN, Entry } from './analog-in.entity';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'REDIS_SPI_SERVICE', transport: Transport.REDIS, options: {
        host: 'localhost', port: 6379
      }}
    ]),
    TypeOrmModule.forFeature([ANALOG_IN, Entry])
  ],
  controllers: [SpiController],
  providers: [SpiService],
})
export class SpiModule {}
