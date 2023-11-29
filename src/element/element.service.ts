import { Injectable } from '@nestjs/common';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { Imagen } from './entities/imagen.entity';
import { Element } from './entities/element.entity';
import { Music } from './entities/music.entity';
import { PresenterVideo } from './entities/presenter-video.entity';

@Injectable()
export class ElementService {
  // constructor(
  //   @InjectRepository(Element)
  //   private readonly elementRepository: Repository<Element>,
  //   @InjectRepository(Imagen)
  //   private readonly imagenRepository: Repository<Imagen>,
  //   @InjectRepository(Video)
  //   private readonly videoRepository: Repository<Video>,
  //   @InjectRepository(Music)
  //   private readonly musicRepository: Repository<Music>,
  //   @InjectRepository(PresenterVideo)
  //   private readonly presenterVideoRepository: Repository<PresenterVideo>,
  // ) {}

  async create(createElementDto: CreateElementDto) {
    // const elementType = createElementDto.type; // Supongamos que tienes un campo 'type' en tu payload
    // let createdElement;

    // switch (elementType) {
    //   case 'imagen':
    //     console.log('Holaaa');
    //     createdElement = await this.imagenRepository.save(
    //       this.imagenRepository.create(createElementDto),
    //     );
    //     break;

    //   case 'video':
    //     createdElement = await this.videoRepository.save(
    //       this.videoRepository.create(createElementDto),
    //     );
    //     break;

    //   case 'music':
    //     createdElement = await this.musicRepository.save(
    //       this.musicRepository.create(createElementDto),
    //     );
    //     break;

    //   case 'presenter-video':
    //     createdElement = await this.presenterVideoRepository.save(
    //       this.presenterVideoRepository.create(createElementDto),
    //     );
    //     break;

    //   default:
    //     throw new Error('Tipo de elemento no soportado');
    // }

    // return createdElement;
    return '';
  }

  async findAll() {
    // const elements = await this.elementRepository.find();

    // // Obtén todos los elementos de la clase hija 'Imagen'
    // const imagenElements = await this.imagenRepository.find();

    // // Combina los resultados
    // const allElements = elements.concat(imagenElements);

    // // Mapea los resultados a DTO si es necesario
    // // const mappedElements = allElements.map((element) => this.mapToDto(element));

    // return allElements;
    return '';
  }

  private mapToDto(element: Element) {
    return {
      id: element.id,
      path: element.path,
      index: element.index,
      programmingId: element.programming.id, // Asegúrate de ajustar esto según tu relación real
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} element`;
  }

  update(id: number, updateElementDto: UpdateElementDto) {
    return `This action updates a #${id} element`;
  }

  remove(id: number) {
    return `This action removes a #${id} element`;
  }
}
