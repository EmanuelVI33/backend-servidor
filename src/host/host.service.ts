import { Injectable } from '@nestjs/common';
import { CreateHostDto } from './dto/create-host.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Host } from './entities/host.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(Host)
    private readonly hostRepository: Repository<Host>,
  ) {}

  async create(createHostDto: CreateHostDto) {
    const host = this.hostRepository.create(createHostDto);
    return await this.hostRepository.save(host);
  }

  findAll() {
    return this.hostRepository.find();
  }

  async findOne(id: number) {
    const program = await this.hostRepository.findOneBy({ id });

    if (!program) {
      // Manejo de error si el presentador no existe
      throw new Error('Presentador no encontrado');
    }

    return program;
  }
}
