import { Program } from 'src/program/entities/program.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Programming {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column()
  startTime: string;

  @Column()
  description:string;

  @Column()
  host:number;

  @ManyToOne(() => Program, (program: Program) => program.programming,{onDelete: 'CASCADE'})
  
  program: Program;

  @Column('int', { array: true, nullable: true })
  elements: number[] = [];
}
