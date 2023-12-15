import { Module } from '@nestjs/common';
import { AudiuService } from './audiu.service';

@Module({
  providers: [AudiuService],
  exports:[AudiuService]
})
export class AudiuModule {}
