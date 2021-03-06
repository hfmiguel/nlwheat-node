import axios from 'axios';
import "dotenv/config"
import prismaClient from '../prisma/index';
import { sign } from "jsonwebtoken"

/**
 * Receber o codigo (string)
 * Recuperar o access token através do codigo no github
 * Recuperar infos do usuario do github
 * Verificar se o usuario existe em nosso banco de dados
 * ---- Sim: retornar o usuario e gera um token
 * ---- Não: Criar um usuario no banco de dados e gerar um token
 * Retornar as informações do usuario e o token
 */

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  id: number
  name: string
  login: string
  avatar_url: string
}

class AuthenticateUserService {


  async execute(code: string) {

    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": 'application/json'
      }
    });

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      }
    })

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          name,
          login,
          avatar_url,
        }
      })
    }

    const jwtToken = process.env.JWT_SECRET;

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        }
      },
      String(jwtToken),
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      token,
      user
    }
  }

}

export { AuthenticateUserService }