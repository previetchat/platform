import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.friends)
  friend1: User

  @ManyToOne(() => User, user => user.friends)
  friend2: User
}
