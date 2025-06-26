import bcrypt from "bcrypt";

export const passwordService = {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  },

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  },
};
