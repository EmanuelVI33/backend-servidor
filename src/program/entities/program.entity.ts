import { Programming } from 'src/programming/entities/programming.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @OneToMany(
    () => Programming,
    (programming: Programming) => programming.program,
  )
  programming: Programming[]; // Tiene una lista de programacciones
}
