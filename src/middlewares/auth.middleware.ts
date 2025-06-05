
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../configs/config";
import { tokenRepository } from "../repositories/token.repository";

declare module "express" {
    interface Request {
        user?: {
            userId: string;
            email: string;
            role: string;
        };
    }
}

export const checkAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const token = authHeader.replace("Bearer ", "");
        const payload = jwt.verify(token, config.JWT_ACCESS_SECRET) as any;

        const storedToken = await tokenRepository.findByParam({ accessToken: token });
        if (!storedToken) {
            res.status(401).json({ message: "Invalid token (not in DB)" });
            return;
        }

        req.user = payload;
        next();
    } catch (e) {
        res.status(401).json({ message: "Unauthorized", error: (e as Error).message });
    }
};

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(403).json({ message: "Access denied. No user info" });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied. Insufficient permissions" });
            return;
        }

        next();
    };
};
