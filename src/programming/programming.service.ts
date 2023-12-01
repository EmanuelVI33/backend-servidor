import { Injectable } from '@nestjs/common';
import { CreateProgrammingDto } from './dto/create-programming.dto';
import { UpdateProgrammingDto } from './dto/update-programming.dto';
import { Programming } from './entities/programming.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/program/entities/program.entity';

@Injectable()
export class ProgrammingService {
  constructor(
    @InjectRepository(Programming)
    private programmingRepository: Repository<Programming>,
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) {}

  async create(
    createProgrammingDto: CreateProgrammingDto,
  ): Promise<Programming> {
    const { programId, ...programmingData } = createProgrammingDto;

    const program = await this.programRepository.findOneBy({ id: programId });

    console.log(`Programa ${program.id}`);

    if (!program) {
      // Manejo de error si el programa no existe
      throw new Error('Programa no encontrado');
    }

    const programming = this.programmingRepository.create({
      ...programmingData,
      program,
    });

    // Inicializar
    programming.elements = [];

    return this.programmingRepository.save(programming);
  }

  async findAll(): Promise<Programming[]> {
    return this.programmingRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} programming`;
  }

  update(id: number, updateProgrammingDto: UpdateProgrammingDto) {
    return `This action updates a #${id} programming`;
  }

  remove(id: number) {
    return `This action removes a #${id} programming`;
  }
}
