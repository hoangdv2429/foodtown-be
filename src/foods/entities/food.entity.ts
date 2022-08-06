import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Components } from './components.entity';

@Entity() // sql table === 'food'
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  price: number;

  //   @Column('json', { nullable: true })
  @JoinTable()
  @ManyToMany((type) => Components, (component) => component.foods)
  components: string[];
}
