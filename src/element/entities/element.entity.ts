import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ElementOptions } from '../interfaces/ElementOption';
import { Programming } from 'src/programming/entities/programming.entity';

@Entity('element')
export abstract class Element extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  path?: string;

  @Column()
  index: number;

  @Column()
  type: string;

  // Un elemento pertenece a una programación
  @ManyToOne(() => Programming, (programming) => programming.elements)
  programming: Programming;

  constructor(
    options: ElementOptions = {
      type: '',
      path: '',
      index: 0,
      programming: null,
    },
  ) {
    super();
    this.type = options.type;
    this.path = options.path;
    this.index = options.index;
    this.programming = options.programming;
  }
}
