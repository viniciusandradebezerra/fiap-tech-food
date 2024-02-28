import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attendant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
