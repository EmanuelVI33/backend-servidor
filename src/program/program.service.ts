import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  create(createProgramDto: CreateProgramDto): Promise<Program> {
    const program = this.programRepository.create(createProgramDto);
    return this.programRepository.save(program);
  }

  findAll() {
    return this.programRepository.find();
  }

  async findOne(id: number) {
    const program = await this.programRepository.findOneBy({ id });

    if (!program) {
      // Manejo de error si el programa no existe
      throw new Error('Programa no encontrado');
    }

    return program.programming;
  }

  update(id: number, updateProgramDto: UpdateProgramDto) {
    return `This action updates a #${id} program`;
  }

  remove(id: number) {
    return `This action removes a #${id} program`;
  }

  async getProgrammingsByProgramId(programId: number) {
    const program = await this.programRepository.findOne({
      relations: {
        programming: true,
      },
      where: {
        id: programId,
      },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program.programming;
  }
}
