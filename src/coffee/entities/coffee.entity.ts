import { url } from 'inspector';
import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Double,
} from 'typeorm';
import { UUID } from 'uuid';

@Entity('coffee')
export class Coffee {
  @PrimaryGeneratedColumn(UUID)
  id: UUID;

  @Column({ type: 'varchar', length: 20 })
  Menu: string;

  @Column({ type: 'double precision' })
  Rating: number;

  @Column({ type: 'varchar', length: 20 })
  Category: string;

  @Column({ type: 'varchar', length: 10 })
  Reviewer: string;

  @Column({ type: 'text' })
  Description: string;

  @Column({ type: 'double precision' })
  Price: number;

  @Column({ type: 'text' })
  imgUrl: string;
}
