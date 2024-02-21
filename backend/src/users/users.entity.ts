import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({  unique: true, nullable: true, default: null  })
  username: string;
  @Column({ unique: true })
  email: string;


  @Column()
  password: string;

  @Column()
  role: string;

}
