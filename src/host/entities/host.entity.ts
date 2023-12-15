import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Host {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sex: string;

  @Column({
    unique: true,
  })
  photoUrl: string;
}
