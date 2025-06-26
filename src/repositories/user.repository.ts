import { FilterQuery, SortOrder } from "mongoose";

import {
  IUser,
  IUserCreateDTO,
  IUserQuery,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAll(query: IUserQuery): Promise<IUser[]> {
    const filter: FilterQuery<IUser> = {};

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { surname: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }

    if (query.role) {
      filter.role = query.role;
    }

    const sort: Record<string, SortOrder> = {};
    if (query.order) {
      if (query.order.startsWith("-")) {
        sort[query.order.slice(1)] = -1;
      } else {
        sort[query.order] = 1;
      }
    }

    return await User.find(filter).sort(sort);
  }

  public async getById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  public async registerUser(data: IUserCreateDTO): Promise<IUser> {
    return await User.create(data);
  }

  public async updateUser(
    id: string,
    data: Partial<IUser>,
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  public async updatePassword(
    userId: string,
    hashedPassword: string,
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );
  }
}

export const userRepository = new UserRepository();
