import { Entity, Column } from 'typeorm';

@Entity('coffee')
export class Coffee {
  @Column({ type: 'varchar', length: 20 })
  Menu: string;

  @Column({ type: 'varchar', length: 20 })
  Rating: string;

  @Column({ type: 'varchar', length: 10 })
  Reviewer: string;

  @Column({ type: 'text' })
  Description: string;

  @Column({ type: 'varchar', length: 10 })
  Price: string;
}
