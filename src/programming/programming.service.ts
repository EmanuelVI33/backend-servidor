import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProgrammingDto } from './dto/create-programming.dto';
// import { UpdateProgrammingDto } from './dto/update-programming.dto';
import { Programming } from './entities/programming.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramService } from 'src/program/program.service';

@Injectable()
export class ProgrammingService {
  constructor(
    @InjectRepository(Programming)
    private programmingRepository: Repository<Programming>,
    private readonly programService: ProgramService,
  ) {}

  async create(
    createProgrammingDto: CreateProgrammingDto,
  ): Promise<Programming> {
    const { programId, ...programmingData } = createProgrammingDto;

    const program = await this.programService.findOne(programId);

    const programming = this.programmingRepository.create({
      ...programmingData,
      program,
    });

    return await this.programmingRepository.save(programming);
  }

  // Obtener todos los elementos de una programación
  async getElements(id: number) {
    try {
      const programming = await this.programmingRepository.findOne({
        relations: { elements: true },
        where: { id },
      });

      return programming.elements;
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  async findAll(): Promise<Programming[]> {
    return this.programmingRepository.find();
  }

  async findOne(id: number) {
    try {
      const programming = await this.programmingRepository.findOneBy({
        id,
      });

      if (!programming)
        throw new NotFoundException(`Programming with id ${id} not found`);

      return programming;
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  // update(id: number, updateProgrammingDto: UpdateProgrammingDto) {
  //   return `This action updates a #${id} programming`;
  // }

  remove(id: number) {
    return `This action removes a #${id} programming`;
  }
}
