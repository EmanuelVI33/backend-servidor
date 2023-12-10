import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProgrammingDto } from './dto/create-programming.dto';
// import { UpdateProgrammingDto } from './dto/update-programming.dto';
import { Programming } from './entities/programming.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramService } from 'src/program/program.service';
import { UpdateProgrammingDto } from './dto/update-programming.dto';

@Injectable()
export class ProgrammingService {
  constructor(
    @InjectRepository(Programming)
    private programmingRepository: Repository<Programming>,
    private readonly programService: ProgramService,
    private dataSource: DataSource,
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
