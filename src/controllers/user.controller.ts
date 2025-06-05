import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { IUserQuery } from "../interfaces/user.interface";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query: IUserQuery = req.query;
            const users = await userService.getAll(query);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const user = await userService.getById(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = req.body;
            const user = await userService.register(userData);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedUser = await userService.updateUser(id, data);
            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            await userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
