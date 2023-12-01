import { Column, Entity } from 'typeorm';
import { Element } from './element.entity';
import { ElementOptions } from '../interfaces/ElementOption';

@Entity()
export class PresenterVideo extends Element {
  @Column()
  title: string;

  @Column()
  content: string;

  constructor(
    options: ElementOptions = {
      type: '',
      path: '',
      index: 0,
      title: '',
      content: '',
    },
  ) {
    super(options);
    const j = JSON.stringify(options);
    console.log(`Desde contructor PresenterVideo ${j}`);
    this.title = options.title;
    this.content = options.content;
  }
}
