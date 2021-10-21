import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

/**
 * Controller de CreateMessage
 */
class CreateMessageController {

  /**
   * Cria uma nova mensagem
   * @param request 
   * @param response 
   * @returns json
   */
  async handle(request: Request, response: Response) {

    const { text } = request.body;
    const { user_id } = request;
    const service = new CreateMessageService();

    try {
      const result = await service.execute(text, user_id);

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

export { CreateMessageController }