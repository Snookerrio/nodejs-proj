import { Request, Response, NextFunction } from "express";
import { clinicService } from "../services/clinic.service";
import { IClinicQuery } from "../interfaces/clinic.interface";

class ClinicController {
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query: IClinicQuery = req.query;
            const isAdmin = req.user?.role === 'admin';

            const hasSearchParams = query.search || query.service || query.order;

            if (!isAdmin && !hasSearchParams) {
                 res.status(403).json({
                    message: "Access denied. Regular users must use search, service or order filters.",
                });
            }
            const clinics = await clinicService.getAll(query);
            res.json(clinics);
        } catch (error) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const clinic = await clinicService.getById(id);
            if (!clinic) {
                res.status(404).json({ message: "Clinic not found" });
                return;
            }
            res.json(clinic);
        } catch (error) {
            next(error);
        }
    }

    public async createClinic(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const newClinic = await clinicService.createClinic(data);
            res.status(201).json(newClinic);
        } catch (error) {
            next(error);
        }
    }

    public async updateClinic(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedClinic = await clinicService.updateClinic(id, data);
            if (!updatedClinic) {
                res.status(404).json({ message: "Clinic not found" });
                return;
            }
            res.json(updatedClinic);
        } catch (error) {
            next(error);
        }
    }

    public async deleteClinic(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            await clinicService.deleteClinic(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export const clinicController = new ClinicController();
