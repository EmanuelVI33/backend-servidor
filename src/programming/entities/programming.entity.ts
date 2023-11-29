import { Element } from 'src/element/entities/element.entity';
import { Program } from 'src/program/entities/program.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Programming {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  turn: number;

  @Column({ type: 'time' })
  startTime: string;

  @ManyToOne(() => Program, (program: Program) => program.programming)
  program: Program;

  // Tienen de uno a muchos elementos
  @OneToMany(() => Element, (element: Element) => element.programming)
  elements: Element[];
}
