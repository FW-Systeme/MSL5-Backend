import { Controller, Logger } from '@nestjs/common';
import { SpiService } from './spi.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('spi')
export class SpiController {

  private readonly logger = new Logger(SpiController.name);

  constructor(
    private readonly spiService: SpiService,
  ) {}

  @EventPattern('*')
  handleRedisData(@Payload() data: any) {
    this.logger.debug(`Received Redis Data: ${data}`);
  }
}
