import { Module } from '@nestjs/common';
import { SpiService } from './spi.service';
import { SpiController } from './spi.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ANALOG, Entry } from './analog.entity';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'REDIS_SPI_SERVICE', transport: Transport.REDIS, options: {
        host: '192.168.3.36', port: 6379
      }}
    ]),
    TypeOrmModule.forFeature([ANALOG, Entry])
  ],
  controllers: [SpiController],
  providers: [SpiService],
})
export class SpiModule {}
