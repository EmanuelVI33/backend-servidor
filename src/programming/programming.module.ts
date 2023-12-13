import { Module } from '@nestjs/common';
import { ProgrammingService } from './programming.service';
import { ProgrammingController } from './programming.controller';
import { Programming } from './entities/programming.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramModule } from 'src/program/program.module';

@Module({
  imports: [TypeOrmModule.forFeature([Programming]), ProgramModule],
  exports: [ProgrammingService],
  controllers: [ProgrammingController],
  providers: [ProgrammingService],
})
export class ProgrammingModule {}
