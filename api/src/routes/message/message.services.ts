import { source } from "../../config/db";
import { User } from "../../entities/user.entity";
import { Message } from "../../entities/message.entity";
import { encrypt, decrypt } from "../../crypto";

export const sendMessage = async (
  from: User,
  message: {
    to: number;
    message: string;
  }
) => {
  const to = await source.manager.findOne(User, {
    where: {
      id: message.to,
    },
  });

  if (!to) {
    return {
      error: "User not found",
    };
  }
  const newMessage = new Message();
  newMessage.from = from;
  newMessage.to = to;
  newMessage.message = await encrypt(message.message, from.N, to.N);
  await source.manager.save(newMessage);
  return newMessage;
};

export const getMessages = async (user: User, withUserId: string) => {
  try {
    const messages = await source.manager.query(`
      SELECT "message"."id" AS "message_id", "message"."message" AS "message", "message"."createdAt" AS "createdAt", "from"."id" AS "from_id", "to"."id" AS "to_id",
      "from"."N" AS "from_n", "to"."N" AS "to_n"
      FROM "message" "message" 
      LEFT JOIN "user" "from" ON "from"."id"="message"."fromId"  
      LEFT JOIN "user" "to" ON "to"."id"="message"."toId" 
      WHERE "message"."fromId" = ${withUserId} AND "message"."toId" = ${user.id} OR "message"."fromId" = ${user.id} AND "message"."toId" = ${withUserId}
    `);

    const decrypted_messages: string[] = [];
    for (const message of messages) {
      console.log(message.message, message.from_n, message.to_n);

      const decrypted_message = await decrypt(
        message.message,
        message.from_n,
        message.to_n
      );
      decrypted_messages.push(decrypted_message);
    }


    return messages.map((message: any, idx) => ({
      id: message.message_id,
      message: decrypted_messages[idx],
      createdAt: message.createdAt,
      from: {
        id: message.from_id,
      },
      to: {
        id: message.to_id,
      },
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};
