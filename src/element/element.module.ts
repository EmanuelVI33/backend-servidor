import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element, Video, Imagen, Music, PresenterVideo } from './entities';
import { Programming } from 'src/programming/entities/programming.entity';
import { ElementFactory } from './entities/element.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Element,
      Video,
      Music,
      Imagen,
      PresenterVideo,
      Programming,
    ]),
  ],
  exports: [TypeOrmModule.forFeature([Element])],
  controllers: [ElementController],
  providers: [ElementService, ElementFactory],
})
export class ElementModule {}
