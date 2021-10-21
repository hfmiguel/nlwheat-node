import { io } from '../app';
import prismaClient from '../prisma/index';


class CreateMessageService {

  async execute(text: string, user_id: string) {

    const message = await prismaClient.message.create({
      data: {
        text,
        user_id
      },
      include: {
        user: true
      }
    });

    const infoWS = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        id: message.user.id,
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    }

    /**
      * Emitir para todos os usuários conectados
      * ao websocket
      * eventName: new_message
    */
    io.emit('new_message', infoWS);

    return message;
  }
}

export { CreateMessageService };