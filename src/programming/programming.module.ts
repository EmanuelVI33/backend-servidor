import { Module } from '@nestjs/common';
import { ProgrammingService } from './programming.service';
import { ProgrammingController } from './programming.controller';
import { Programming } from './entities/programming.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from 'src/program/entities/program.entity';
// import { ProgramModule } from 'src/program/program.module';

@Module({
  imports: [TypeOrmModule.forFeature([Programming, Program])],
  exports: [TypeOrmModule.forFeature([Programming])],
  controllers: [ProgrammingController],
  providers: [ProgrammingService],
})
export class ProgrammingModule {}
