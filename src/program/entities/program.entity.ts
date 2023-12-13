import { Programming } from 'src/programming/entities/programming.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique:true,
  })
  name: string;

  @Column()
  duration: string;

  @Column()
  cover:string;

  @Column()
  description:string;

  @Column()
  host:number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => Programming,
    (programming: Programming) => programming.program,
  )
  programming: Programming[]; // Tiene una lista de programacciones
}
