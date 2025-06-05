import {IToken} from "../interfaces/token.interface";
import {model, Schema} from "mongoose";


const TokenSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
    },
    { timestamps: true }
);

export const Token = model<IToken>("Token", TokenSchema);