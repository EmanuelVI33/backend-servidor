import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { UpdateElementDto } from './dto/update-element.dto';
import { Element } from './entities/element.entity';
import { ElementFactory } from './entities/element.factory';
import { ProgrammingService } from 'src/programming/programming.service';
import { DataSource, Repository } from 'typeorm';
// import { CreateElementDto } from './dto/create-element.dto';s
import { DIdService } from './service/d-id.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ElementsTriggerDto } from './dto/element-trigger';
import { Imagen, PresenterVideo } from './entities';
import { FileService } from './service/file.service';
import * as pathFile from 'path';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    private readonly elementFactory: ElementFactory,
    private readonly programmingService: ProgrammingService,
    private readonly dIdService: DIdService,
    private dataSource: DataSource,
  ) {}

  async create(elementData: any) {
    try {
      const programmingId = elementData.programmingId;
      const programming = await this.programmingService.findOne(programmingId);

      console.log(`Programacción ${programming.title}`);

      return await this.elementFactory.createElement({
        ...elementData,
        programming,
      });
    } catch (error) {
      throw new BadRequestException(`Error creating element: ${error}`);
    }
  }

  async generateElement(elementTriggerDto: ElementsTriggerDto) {
    const { elementsIndex, programmingId } = elementTriggerDto;
    console.log(elementsIndex, programmingId);
    const elements = await this.dataSource
      .getRepository(Element)
      .createQueryBuilder('element')
      .leftJoinAndSelect('element.programming', 'programming')
      .where('programming.id = :programmingId', { programmingId })
      .andWhere('element.index IN (:...elementsIndex)', { elementsIndex }) // Que el indice este dentro del arrray
      .getMany();

    // Aumentar type a element
    const elementsWithTypes = elements.map((element) => {
      console.log(`Elemento ${element.id}`);
      const type = element.constructor.name;
      const elementType = this.elementFactory.createElementObject({
        id: element.id,
        ...element,
        type,
      });
      return elementType;
    });

    elementsWithTypes.map(async (element: Element) => {
      const type = element.constructor.name;
      if (element instanceof PresenterVideo) {
        const idTalk = await this.dIdService.generateVideo(element.content);

        // Devuelve el path donde se almaceno
        const path = await this.getVideoDone(idTalk);

        console.log(element);

        // La fabría actualiza el element
        await this.elementFactory.createElement({
          id: element.id,
          ...element,
          type,
          idTalk,
          path,
        });
      } else if (element instanceof Imagen) {
        console.log(`Otro: ${element.duration}`);
      }
    });

    return { ok: true };
  }

  async getVideoDone(idTalk: string) {
    let aux;
    while (true) {
      this.esperar(1000);
      const { data } = await this.dIdService.getVideo(idTalk);
      aux = data;
      if (data.status === 'done') break;
    }

    // Obtén la ruta del directorio actual del archivo actual
    const { result_url: videoUrl } = aux;
    const currentDirectory = __dirname;

    // Construye la ruta a la carpeta public/videos en la raíz del proyecto
    const destinationPath = pathFile.join(
      currentDirectory,
      '../..',
      'public',
      'videos',
      `${idTalk}.mp4`,
    );

    FileService.downloadAndSaveVideo(videoUrl, destinationPath);

    const path = `public/videos/${idTalk}.mp4`;

    return path;
  }

  esperar(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getElements(programmingId: number): Promise<Element[]> {
    try {
      const elements = await this.dataSource
        .getRepository(Element)
        .createQueryBuilder('element')
        .leftJoinAndSelect('element.programming', 'programming')
        .where('programming.id = :programmingId', { programmingId })
        .orderBy('element.index', 'ASC') // Obtener los elementos de acuerdo al index
        .getMany();

      if (!elements || elements.length === 0) {
        throw new NotFoundException(
          `No elements found for programming with id ${programmingId}`,
        );
      }

      return elements;
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  // /**
  //  *
  //  * @param programmingId
  //  * @returns Lista de referencia a los elementos
  //  */
  // async getElementsPath(programmingId: number) {
  //   try {
  //     const elements = await this.dataSource
  //       .getRepository(Element)
  //       .createQueryBuilder('element')
  //       .leftJoinAndSelect('element.programming', 'programming')
  //       .select('path')
  //       .where('programming.id = :programmingId', { programmingId })
  //       .getMany();

  //     return elements;
  //   } catch (error) {}
  // }

  async findAll() {
    return '';
  }

  findOne(id: number) {
    return `This action returns a #${id} element`;
  }

  // update(id: number, updateElementDto: UpdateElementDto) {
  //   return `This action updates a #${id} element`;
  // }

  remove(id: number) {
    return `This action removes a #${id} element`;
  }
}
