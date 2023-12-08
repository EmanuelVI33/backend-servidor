import { Injectable } from '@nestjs/common';
import { Element, Imagen, Music, PresenterVideo, Video } from '.';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElementEnum } from '../enum/ElementEnum';
import { ElementOptions } from '../interfaces/ElementOption';

@Injectable()
export class ElementFactory {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(PresenterVideo)
    private readonly presenterVideoRepository: Repository<PresenterVideo>,
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) {}
  async createElement(data: ElementOptions): Promise<Element> {
    switch (data.type) {
      case ElementEnum.imagen:
        const imagen = new Imagen(data);
        imagen.programming = data.programming;
        return await this.imagenRepository.save(imagen);
      case ElementEnum.music:
        const music = new Music(data);
        music.programming = data.programming;
        return await this.musicRepository.save(music);
      case ElementEnum.presenterVideo:
        // const existingPresenterVideo =
        //   data.id && (await this.presenterVideoRepository.findOne(data.id));
        // if (existingPresenterVideo) {
        //   // Si el elemento ya existe, actualiza sus propiedades
        //   this.presenterVideoRepository.merge(existingPresenterVideo, data);
        //   return await this.presenterVideoRepository.save(
        //     existingPresenterVideo,
        //   );
        // } else {
        //   // Si el elemento no existe, crea uno nuevo
        //   const presenterVideo = new PresenterVideo(data);
        //   presenterVideo.programming = data.programming;
        //   return await this.presenterVideoRepository.save(presenterVideo);
        // }

        const presenterVideo = new PresenterVideo(data);
        console.log(`PresenterVideo: ${presenterVideo}`);
        presenterVideo.programming = data.programming;
        return await this.presenterVideoRepository.save(presenterVideo);
      case ElementEnum.video:
        const video = new Video(data);
        video.programming = data.programming;
        return await this.videoRepository.save(video);
      default:
        throw new Error('Invalid element type');
    }
  }

  createElementObject(data: any): Element {
    switch (data.type) {
      case ElementEnum.imagen:
        return new Imagen(data);
      case ElementEnum.music:
        return new Music(data);
      case ElementEnum.presenterVideo:
        console.log(`Dataaa ${data.id}`);
        return new PresenterVideo(data);
      case ElementEnum.video:
        return new Video(data);
      default:
        throw new Error('Invalid element type');
    }
  }
}
