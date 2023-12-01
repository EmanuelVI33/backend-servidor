import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ElementOptions } from '../interfaces/ElementOption';

export abstract class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  path?: string;

  @Column()
  index: number;

  @Column()
  type: string;

  // Un elemento pertenece a una programación
  // @ManyToOne(
  //   () => Programming,
  //   (programming: Programming) => programming.elements,
  // )
  // @Column()
  // programming: Programming;

  constructor(
    options: ElementOptions = {
      type: '',
      path: '',
      index: 0,
      // programming: null,
    },
  ) {
    console.log(`Desde contructor Element ${options}`);
    this.type = options.type;
    this.path = options.path;
    this.index = options.index;
    // this.programming = options.programming;
  }
}
