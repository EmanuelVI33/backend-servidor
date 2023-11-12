import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;
}
