import prismaClient from '../prisma/index';

class GetLastMessageService {

  /**
   * Executa a consulta ao banco para retornar as menasagens do usuário
   * @returns json
   */
  async execute() {

    const message = await prismaClient.message.findMany({
      take: 3, /** Retorna somente as 3 ultimas messages */
      orderBy: {
        created_at: 'desc' /** Ordena por data de criação */
      },
      include: {
        user: true /** Retorna o usuário que criou a mensagem */
      },
    });

    return message;
  }
}

export { GetLastMessageService };