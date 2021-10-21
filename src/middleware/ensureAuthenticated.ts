import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import "dotenv/config"


interface TokenPayload {
  sub: string;
}

/**
  * @author Henrique Felix
  * @description - Ensure that the user is authenticated
  * @param req 
  * @param res 
  * @param next 
  * @returns 
 */
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authToken = req.headers.authorization;

  /**
    * Check if the user is authenticated
    * @param authToken
  */
  if (!authToken) {
    return res.status(401).json({
      message: 'Token not provided'
    });
  }

  /**
   * Split the token value
    * @example Bearer 12sfsfsdfs31123dffs23jkkjdas
    * [0 = Bearer, token = 12sfsfsdfs31123dffs23jkkjdas] 
    * @param authToken
   */
  const [, token] = authToken.split(' ');

  try {

    const jwtToken = String(process.env.JWT_SECRET);
    const { sub } = verify(token, jwtToken) as TokenPayload;

    req.user_id = sub;

    return next();

  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        message: 'Token expired'
      });
    } else {
      return res.json(error);
    }
  }
}