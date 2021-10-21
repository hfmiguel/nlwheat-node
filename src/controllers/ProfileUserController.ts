import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

/**
 * Controller para ler os dados do usuario logado
 * @author Henrique Felix
 */
class ProfileUserController {

  /**
   * Retorna as últimas mensagens de um usuário
   * @param request 
   * @param response 
   * @returns json
   */
  async handle(request: Request, response: Response) {
    const service = new ProfileUserService();

    const { user_id } = request;

    try {

      const result = await service.execute(user_id);
      return response.json(result);

    } catch (err) {
      if (err instanceof Error) {
        return response.json({
          error: err.message
        });
      } else {
        return response.json(err);
      }
    }
  }
}

export { ProfileUserController }