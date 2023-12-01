import { Injectable } from '@nestjs/common';
import { UpdateElementDto } from './dto/update-element.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from './entities/element.entity';
import { Programming } from 'src/programming/entities/programming.entity';
import { ElementFactory } from './entities/element.factory';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Programming)
    private readonly programmingRepository: Repository<Programming>,
    private readonly elementFactory: ElementFactory,
  ) {}

  async create(data: any) {
    const j = JSON.stringify(data);
    console.log(`Mostrar Data ${j}`);
    const newElement = await this.elementFactory.createElement(data);

    const programming = await this.programmingRepository.findOneBy({
      id: data.programmingId,
    });

    console.log(`Resultado de la fabríca ${+newElement.id}`);

    if (programming) {
      if (!programming.elements) {
        programming.elements = [];
      }
      // programming.elements.push(newElement.id);
      await this.programmingRepository.save(programming);
    }

    return newElement;
  }

  async findAll() {
    return '';
  }

  private mapToDto(element: Element) {
    return {
      id: element.id,
      path: element.path,
      index: element.index,
      // programmingId: element.programming.id, // Asegúrate de ajustar esto según tu relación real
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
