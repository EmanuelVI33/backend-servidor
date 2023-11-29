import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';
import { Programming } from 'src/programming/entities/programming.entity';
import { Video } from './entities/video.entity';
import { Imagen } from './entities/imagen.entity';
import { PresenterVideo } from './entities/presenter-video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Element,
      Video,
      Imagen,
      PresenterVideo,
      Programming,
    ]),
  ],
  exports: [TypeOrmModule.forFeature([Element])],
  controllers: [ElementController],
  providers: [ElementService],
})
export class ElementModule {}
