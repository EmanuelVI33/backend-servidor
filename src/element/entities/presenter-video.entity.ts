import { ChildEntity, Column } from 'typeorm';
import { Element } from './';
import { ElementOptions } from '../interfaces/ElementOption';

@ChildEntity()
export class PresenterVideo extends Element {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column('int', { nullable: true })
  idTalk?: number;

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
    this.title = options.title;
    this.content = options.content;
    this.idTalk = this.idTalk;
  }
}
