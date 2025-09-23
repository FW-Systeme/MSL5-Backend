import { Module } from '@nestjs/common';
import { SpiService } from './spi.service';
import { SpiController } from './spi.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Analog, AnalogSchema } from './analog.schema';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'REDIS_SPI_SERVICE', transport: Transport.REDIS, options: {
        host: '192.168.3.36', port: 6379
      }}
    ]),
    MongooseModule.forFeature([
      {name: Analog.name, schema: AnalogSchema}
    ])
  ],
  controllers: [SpiController],
  providers: [SpiService],
})
export class SpiModule {}
