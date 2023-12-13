import { Element } from 'src/element/entities';
import { Program } from 'src/program/entities/program.entity';
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  description?: string;

  @Column()
  host:number;

  @ManyToOne(() => Program, (program: Program) => program.programming,{onDelete: 'CASCADE'})
  
  program: Program;

  @OneToMany(() => Element, (element) => element.programming)
  elements: Element[];
}
