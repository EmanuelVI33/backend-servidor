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
<<<<<<< HEAD
import { Imagen, Music, PresenterVideo, Video } from './entities';
=======
import { Imagen, PresenterVideo } from './entities';
>>>>>>> 0824ad07c14916839ef2d0f9698fc168118b9432
import { FileService } from './service/file.service';
import * as pathFile from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    private readonly elementFactory: ElementFactory,
    private readonly programmingService: ProgrammingService,
    private readonly dIdService: DIdService,
    private dataSource: DataSource,
  ) {
    ffmpeg.setFfmpegPath(
      join(__dirname, '..', '..', 'src', 'ffmpeg', 'ffmpeg.exe'),
    ); // Ajusta la ruta según tu estructura de carpetas
  }

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

  async genImageByPath(imagePath: string, duration: number): Promise<string> {
    try {
      const outputFilePath = path.join('src', 'output.mp4');
      await new Promise((resolve, reject) => {
        ffmpeg()
          .input(imagePath)
          .inputFormat('image2')
          .inputFPS(1 / duration)
          .videoCodec('libx264')
          .audioCodec('aac')
          .videoFilters('scale=1280:720')
          .toFormat('mp4')
          .output(outputFilePath)

          .on('end', () => {
            console.log('Video generado con éxito');
            resolve(outputFilePath);
          })
          .on('error', (err) => {
            console.error('Error al generar el video:', err);
            reject(err);
          })
          .run();
      });

      return outputFilePath;
    } catch (error) {
      console.error('Error en la generación del video:', error);
      throw error;
    }
  }

  async genImageByFile(
    image: Express.Multer.File,
    duration: number,
  ): Promise<string> {
    const outputFilePath = path.join('src', 'output.mp4'); // archivo de salida

    return new Promise(async (resolve, reject) => {
      try {
        const inputBuffer = image.buffer;

        // Crear un archivo temporal para la entrada
        const tempInputFilePath = path.join(
          __dirname,
          `input_${Date.now()}.jpg`,
        );
        await fs.writeFile(tempInputFilePath, inputBuffer);

        ffmpeg()
          .input(tempInputFilePath)
          .inputFormat('image2')
          .inputFPS(1 / duration) // 1 frame por segundo
          .videoCodec('libx264')
          .audioCodec('aac')
          .toFormat('mp4')
          .outputOptions('-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2') // Redimensionar a una altura divisible por 2
          .output(outputFilePath)
          .on('end', () => {
            console.log('Video generado con éxito');
            resolve(outputFilePath);
          })
          .on('error', (err) => {
            console.error('Error al generar el video:', err);
            reject(err);
          })
          .run();
      } catch (error) {
        console.error('Error al generar la imagen:', error);
        reject(error);
      }
    });
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
        .innerJoinAndSelect('element.programming', 'programming')
        .where('programming.id = :programmingId', { programmingId })
        .orderBy('element.index', 'ASC') // Obtener los elementos de acuerdo al index
        .getMany();

      // console.log(elements);
      let newElements = [];
      if (!elements || elements.length === 0) {
        return [];
      } else {
        newElements = elements.map((ele) => this.getTypeOfElement(ele));
      }
      // console.log(newElements);

      return newElements;
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

  getTypeOfElement(data) {
    if (data instanceof Music) {
      return { ...data, type: 'Music' };
    } else if (data instanceof Video) {
      return { ...data, type: 'Video' };
    } else if (data instanceof PresenterVideo) {
      return { ...data, type: 'PresenterVideo' };
    } else if (data instanceof Imagen) {
      return { ...data, type: 'Imagen' };
    }
  }
}
