import { Column, Entity } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class Music extends Element {
  @Column()
  name: string;

  @Column()
  author: string;
}
