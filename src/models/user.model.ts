import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      enum: RoleEnum,
      type: String,
      required: true,
      default: RoleEnum.USER,
    },
  },
  { timestamps: true, versionKey: false },
);

export const User = model<IUser>("User", userSchema);
