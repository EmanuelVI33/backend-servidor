import { ChildEntity, Column } from 'typeorm';
import { Element } from './';
import { ElementOptions } from '../interfaces/ElementOption';

@ChildEntity()
export class Video extends Element {
  @Column()
  title: string;

  constructor(
    options: ElementOptions = {
      type: '',
      path: '',
      index: 0,
      programming: null,
      title: '',
    },
  ) {
    super(options);
    this.title = options.title;
  }
}
