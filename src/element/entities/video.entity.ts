import { Column, Entity } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class Video extends Element {
  @Column()
  title: string;
}
