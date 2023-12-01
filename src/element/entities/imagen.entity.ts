import { Column, Entity } from 'typeorm';
import { Element } from './element.entity';
import { ElementOptions } from '../interfaces/ElementOption';

@Entity()
export class Imagen extends Element {
  @Column()
  duration: number;

  constructor(
    options: ElementOptions = {
      type: '',
      path: '',
      index: 0,
      programming: null,
      duration: 0,
    },
  ) {
    super(options);
    console.log(`Desde constructor de Imagen ${options.duration}`);
    this.duration = options.duration;
  }
}
