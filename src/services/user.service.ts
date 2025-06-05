import { IUser, IUserQuery, IUserCreateDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async register(data: IUserCreateDTO): Promise<IUser> {
        return userRepository.registerUser(data);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return userRepository.getByEmail(email);
    }

    public async updatePassword(userId: string, hashedPassword: string): Promise<IUser | null> {
        return userRepository.updatePassword(userId, hashedPassword);
    }

    public async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return userRepository.updateUser(id, data);
    }

    public async getAll(query: IUserQuery): Promise<IUser[]> {
        return userRepository.getAll(query);
    }

    public async getById(id: string): Promise<IUser | null> {
        return userRepository.getById(id);
    }

    public async deleteUser(id: string): Promise<void> {
        return userRepository.deleteUser(id);
    }
}

export const userService = new UserService();
