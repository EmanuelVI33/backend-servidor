import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element, Video, Imagen, Music, PresenterVideo } from './entities';
import { ElementFactory } from './entities/element.factory';
import { ProgrammingModule } from 'src/programming/programming.module';
import { DIdService } from './service/d-id.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Element, Video, Music, Imagen, PresenterVideo]),
    ProgrammingModule,
  ],
  exports: [ElementService],
  controllers: [ElementController],
  providers: [ElementService, ElementFactory, DIdService],
})
export class ElementModule {}
