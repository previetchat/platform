import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  @ManyToMany(() => User, (user) => user.invited)
  @JoinTable()
  invitedBy: User[];

  @ManyToMany(() => User, (user) => user.invitedBy)
  invited: User[];

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];

  @Column()
  N: string;
}
