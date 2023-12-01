import { Program } from 'src/program/entities/program.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('int', { array: true, nullable: true })
  elements: number[] = [];
}
