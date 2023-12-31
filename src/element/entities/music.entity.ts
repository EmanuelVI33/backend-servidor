import { ChildEntity, Column } from 'typeorm';
import { Element } from './';
import { ElementOptions } from '../interfaces/ElementOption';

@ChildEntity()
export class Music extends Element {
  @Column()
  name: string;

  @Column()
  author: string;

  constructor(
    options: ElementOptions = {
      type: '',
      path: '',
      index: 0,
      programming: null,
      author: '',
      name: '',
    },
  ) {
    super(options);
    this.name = options.name;
    this.author = options.author;
  }
}
