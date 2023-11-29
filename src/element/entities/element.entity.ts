import { Programming } from 'src/programming/entities/programming.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

interface IElement {
  id: number;
  path: string;
  index: number;
}

@Entity()
export class Element implements IElement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  index: number;

  // Un elemento pertenece a una programación
  @ManyToOne(
    () => Programming,
    (programming: Programming) => programming.elements,
  )
  programming: Programming;
}
