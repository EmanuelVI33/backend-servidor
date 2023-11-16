import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Programming } from 'src/programming/entities/programming.entity';
// import { ProgrammingModule } from 'src/programming/programming.module';

@Module({
  imports: [TypeOrmModule.forFeature([Program, Programming])],
  exports: [TypeOrmModule.forFeature([Program])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
