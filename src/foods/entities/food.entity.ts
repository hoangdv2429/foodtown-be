import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column('json', { nullable: true })
  components: string[];
}
