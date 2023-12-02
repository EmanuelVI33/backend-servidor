import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { UpdateElementDto } from './dto/update-element.dto';
import { Element } from './entities/element.entity';
import { ElementFactory } from './entities/element.factory';
import { ProgrammingService } from 'src/programming/programming.service';
import { DataSource } from 'typeorm';

@Injectable()
export class ElementService {
  constructor(
    private readonly elementFactory: ElementFactory,
    private readonly programmingService: ProgrammingService,
    private dataSource: DataSource,
  ) {}

  async create(elementData: any) {
    try {
      const programmingId = elementData.programmingId;
      const programming = await this.programmingService.findOne(programmingId);
      return await this.elementFactory.createElement({
        ...elementData,
        programming,
      });
    } catch (error) {
      throw new BadRequestException(`Error creating element: ${error}`);
    }
  }

  async getElements(programmingId: number): Promise<Element[]> {
    try {
      const elements = await this.dataSource
        .getRepository(Element)
        .createQueryBuilder('element')
        .leftJoinAndSelect('element.programming', 'programming')
        .where('programming.id = :programmingId', { programmingId })
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
