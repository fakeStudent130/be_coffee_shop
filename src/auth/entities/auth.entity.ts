import { type } from 'os';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn(UUID)
  id: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
