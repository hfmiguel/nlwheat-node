import { Request, Response } from "express";
import { GetLastMessageService } from "../services/GetLastMessageService";

/**
 * Controller para ler mensagens
 * @author Henrique Felix
 */
class GetLastMessagesController {

  /**
   * Retorna as últimas mensagens de um usuário
   * @param request 
   * @param response 
   * @returns json
   */
  async handle(request: Request, response: Response) {
    const service = new GetLastMessageService();
    try {

      const result = await service.execute();
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

export { GetLastMessagesController }