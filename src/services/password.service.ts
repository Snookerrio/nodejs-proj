import bcrypt from "bcrypt";

export const passwordService = {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    },

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
};
