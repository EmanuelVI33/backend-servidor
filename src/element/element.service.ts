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
import { ElementEnum } from './enum/ElementEnum';
import { isInstance } from 'class-validator';
import { PresenterVideo } from './entities';

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

    const elementsWithTypes = elements.map((element) => {
      const type = element.constructor.name;
      const elementType = this.elementFactory.createElementObject({
        ...element,
        type,
      });
      console.log(elementType.id);
      return elementType;
    });

    elementsWithTypes.map((element) => {
      if (element instanceof PresenterVideo) {
        this.generateVideo(element);
      } else {
        console.log(`Otro: ${element}`);
      }
    });

    return { ok: true };
  }

  async generateVideo(element: PresenterVideo) {
    // const presenterVideo = await this.elementRepository.findOneBy({
    //   id,
    // });

    const idTalk = await this.dIdService.generateVideo(element.content);

    this.elementRepository.save({
      ...element,
      idTalk,
    });

    return idTalk;
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
