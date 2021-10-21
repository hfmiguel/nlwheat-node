import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {

  async handle(request: Request, response: Response) {
    const { code } = request.body;
    const service = new AuthenticateUserService();

    try {
      const result = await service.execute(code);

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

export { AuthenticateUserController }