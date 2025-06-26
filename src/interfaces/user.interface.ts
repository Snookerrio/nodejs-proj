import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: RoleEnum;
  surname: string;
}

export interface IUserQuery {
  search?: string;
  order?: "name" | "-name" | "surname" | "-surname";
  role?: string;
}
export type IUserCreateDTO = Pick<
  IUser,
  "email" | "name" | "surname" | "password"
>;
