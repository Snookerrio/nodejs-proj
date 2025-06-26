import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async createToken(tokenData: IToken): Promise<IToken> {
    return await Token.create(tokenData);
  }

  public async findByParam(param: Partial<IToken>): Promise<IToken | null> {
    return await Token.findOne(param);
  }

  public async updateToken(
    userId: string,
    tokens: Partial<IToken>,
  ): Promise<IToken | null> {
    return await Token.findOneAndUpdate({ userId }, tokens, { new: true });
  }

  public async deleteToken(param: Partial<IToken>): Promise<void> {
    await Token.deleteOne(param);
  }
}

export const tokenRepository = new TokenRepository();
