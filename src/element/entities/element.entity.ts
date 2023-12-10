import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Programming } from 'src/programming/entities/programming.entity';
import { ElementOptions } from '../interfaces/ElementOption';

@Entity('element')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  path?: string;

  @Column()
  index: number;

  @Column({ nullable: true })
  file?: string;

  // Un elemento pertenece a una programación
  @ManyToOne(() => Programming, (programming) => programming.elements)
  programming: Programming;

  constructor(
    options: ElementOptions = {
      path: '',
      index: 0,
      programming: null,
    },
  ) {
    this.id = options.id;
    this.path = options.path;
    this.index = options.index;
    this.programming = options.programming;
  }
}
