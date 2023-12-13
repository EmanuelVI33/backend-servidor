import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const program = this.programRepository.create(createProgramDto);
    return await this.programRepository.save(program);
  }

  async findAll() {
    const programs = await this.programRepository.query(`
      SELECT program.*, host.photoUrl
      FROM program
      INNER JOIN host ON program.host = host.id
    `);

    const baseUrl = 'http://localhost:3010/cover/';
    return programs.map((p) => ({
      ...p,
      coverUrl: `${baseUrl}${p.cover}`,
    }));
  }

  async findOne(id: number) {
    const program = await this.programRepository.findOneBy({ id });
    if (!program) throw new NotFoundException('Programa no encontrado');

    return program;
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    const program = await this.programRepository.findOneBy({ id });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    this.programRepository.merge(program, updateProgramDto);

    return await this.programRepository.save(program);
  }

  async remove(id: number) {
    const programToRemove = await this.programRepository.findOneBy({ id });
    if (!programToRemove) {
      throw new Error('Program not found');
    }

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'cover',
      programToRemove.cover,
    );

    // console.log(filePath);
    // await unlinkAsync(`../../uploads/cover/${programToRemove.cover}`);
    const result = await this.programRepository.remove(programToRemove);
    await unlinkAsync(filePath);
    return result;
  }

  async getProgrammingsByProgramId(programId: number) {
    let programmingList = [];
    try {
      programmingList = await this.programRepository.query(`
      SELECT pmm.*, host.photoUrl
      FROM program p
      INNER JOIN programming pmm ON p.id = pmm.programId
      INNER JOIN host ON pmm.host = host.id
      WHERE pmm.programId = ${programId}
    `);
      // console.log(programmingList);
    } catch (error) {
      console.log(error);
    }
    return programmingList;
  }
}
