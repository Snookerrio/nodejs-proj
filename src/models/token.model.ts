import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";

const TokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true },
);

export const Token = model<IToken>("Token", TokenSchema);
