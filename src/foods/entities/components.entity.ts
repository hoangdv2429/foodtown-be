import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from './food.entity';

@Entity()
export class Components {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Food, (food) => food.components)
  foods: Food[];
}
