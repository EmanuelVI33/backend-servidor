import { Column, Entity } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class Imagen extends Element {
  @Column()
  duration: number;
}
