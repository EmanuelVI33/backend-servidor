import { Column, Entity } from 'typeorm';
import { Element } from './';
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
    this.duration = options.duration;
  }
}
