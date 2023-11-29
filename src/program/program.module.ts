import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Programming } from 'src/programming/entities/programming.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program, Programming])],
  exports: [TypeOrmModule.forFeature([Program])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
