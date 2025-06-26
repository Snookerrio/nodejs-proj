import {
  IUser,
  IUserCreateDTO,
  IUserQuery,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async register(data: IUserCreateDTO): Promise<IUser> {
    return await userRepository.registerUser(data);
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await userRepository.getByEmail(email);
  }

  public async updatePassword(
    userId: string,
    hashedPassword: string,
  ): Promise<IUser | null> {
    return await userRepository.updatePassword(userId, hashedPassword);
  }

  public async updateUser(
    id: string,
    data: Partial<IUser>,
  ): Promise<IUser | null> {
    return await userRepository.updateUser(id, data);
  }

  public async getAll(query: IUserQuery): Promise<IUser[]> {
    return await userRepository.getAll(query);
  }

  public async getById(id: string): Promise<IUser | null> {
    return await userRepository.getById(id);
  }

  public async deleteUser(id: string): Promise<void> {
    return await userRepository.deleteUser(id);
  }
}

export const userService = new UserService();
