import prismaClient from '../prisma/index';

class ProfileUserService {

  /**
   * Executa a consulta ao banco para retornar as informações do usuário
    * @param { string } id : id do usuário
   * @returns json
   */
  async execute(id: string) {
    const userInfo = await prismaClient.user.findFirst({
      where: {
        id: id
      },
      include: {
        messages: true,
      }
    });
    return userInfo;
  }
}

export { ProfileUserService };