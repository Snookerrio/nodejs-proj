import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async register(
    dto: IUserCreateDTO,
  ): Promise<{ user: IUser; tokens: any }> {
    const hashedPassword = await passwordService.hashPassword(dto.password);

    const user = await userService.register({
      ...dto,
      password: hashedPassword,
    });
    const tokens = tokenService.createToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    await tokenRepository.createToken({
      userId: user._id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return { user, tokens };
  }

  public async login(
    email: string,
    password: string,
  ): Promise<{ user: IUser; tokens: any }> {
    const user = await userService.getByEmail(email);
    if (!user) throw new Error("User not found");

    const isValid = await passwordService.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    const tokens = tokenService.createToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    await tokenRepository.createToken({
      userId: user._id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return { user, tokens };
  }

  public async resetPassword(
    userId: string,
    newPassword: string,
  ): Promise<IUser | null> {
    const hashedPassword = await passwordService.hashPassword(newPassword);
    return await userService.updatePassword(userId, hashedPassword);
  }
}

export const authService = new AuthService();
