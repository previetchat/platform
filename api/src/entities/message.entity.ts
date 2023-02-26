import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

import { User } from './user.entity'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string

  @ManyToOne(type => User)
  from: User

  @ManyToOne(type => User)
  to: User

  @CreateDateColumn({ update: false })
  createdAt: Date
}
