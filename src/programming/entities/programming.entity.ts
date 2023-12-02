import { Element } from 'src/element/entities';
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

  @OneToMany(() => Element, (element) => element.programming)
  elements: Element[];
}
