import { Test, TestingModule } from '@nestjs/testing';
import { SpiController } from './spi.controller';
import { SpiService } from './spi.service';

describe('SpiController', () => {
  let controller: SpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpiController],
      providers: [SpiService],
    }).compile();

    controller = module.get<SpiController>(SpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
