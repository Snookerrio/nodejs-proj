

export interface IToken {
    _id?: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITokenPayload {
    userId: string;
    email: string;
    role: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
