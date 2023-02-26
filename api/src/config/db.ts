import { DataSource } from 'typeorm'
import { Friendship } from '../entities/friendship.entity'
import { Message } from '../entities/message.entity'
import { User } from '../entities/user.entity'

export const source = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "postgres",
  ssl: false,
  synchronize: true,
  entities: [User, Message, Friendship],
  subscribers: [],
});

export async function initiateDatabase() {
  await source.initialize()
}
