import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import {
  IToken,
  ITokenPayload,
  TokenPair,
} from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
  public createToken(payload: ITokenPayload): TokenPair {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_LIFETIME as any,
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_LIFETIME as any,
    });

    return { accessToken, refreshToken };
  }

  public async saveToken(userId: string, tokens: TokenPair): Promise<IToken> {
    const existingToken = await tokenRepository.findByParam({ userId });

    if (existingToken) {
      return await tokenRepository.updateToken(userId, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    }

    return await tokenRepository.createToken({
      userId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }

  public async removeToken(refreshToken: string): Promise<void> {
    await tokenRepository.deleteToken({ refreshToken });
  }

  public async findToken(refreshToken: string): Promise<IToken | null> {
    return await tokenRepository.findByParam({ refreshToken });
  }

  public validateAccessToken(token: string): ITokenPayload | null {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET) as ITokenPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }

  public validateRefreshToken(token: string): ITokenPayload | null {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET) as ITokenPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
}

export const tokenService = new TokenService();
