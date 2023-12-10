import { Injectable, NotFoundException } from '@nestjs/common';
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
    let programmingList = [];
    try{
      programmingList = await this.programmingRepository.query(`
      SELECT p.*, host.photoUrl
      FROM programming p
      INNER JOIN host ON p.host = host.id
    `);
    // console.log(programmingList);
    }catch(error){
      console.log(error);
    }
    return programmingList;
  }

  findOne(id: number) {
    return `This action returns a #${id} programming`;
  }

  async update(id: number, updateProgrammingDto: UpdateProgrammingDto) {
    const programming = await this.programmingRepository.findOneBy({id});
    
    if (!programming) {
      throw new NotFoundException(`Programming with ID ${id} not found`);
    }

    this.programmingRepository.merge(programming,updateProgrammingDto);
    
    return await this.programmingRepository.save(programming);
  }

  async remove(id: number) {
    console.log(id);
    const pmm = await this.programmingRepository.findOneBy({id});
    if (!pmm) {
      throw new Error('Programming not found');
    }
    
    return await this.programmingRepository.remove(pmm);
  }
}
