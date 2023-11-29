import { Column, Entity } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class PresenterVideo extends Element {
  @Column()
  title: string;

  @Column()
  content: string;
}
