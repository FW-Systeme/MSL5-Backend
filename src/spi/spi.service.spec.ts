import { Test, TestingModule } from '@nestjs/testing';
import { SpiService } from './spi.service';

describe('SpiService', () => {
  let service: SpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpiService],
    }).compile();

    service = module.get<SpiService>(SpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
