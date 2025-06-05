import { Request, Response, NextFunction } from "express";
import { doctorService } from "../services/doctor.service";

class DoctorController {
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userRole = req.user?.role;


            const hasFilters = req.query.search || req.query.order;

            if (userRole !== "admin" && !hasFilters) {
                res.status(403).json({ message: "Access denied. Non-admin users must use search or sort parameters." });
                return;
            }

            const doctors = await doctorService.getAll(req.query );
            res.json(doctors);
        } catch (error) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const doctor = await doctorService.getById(id);
            if (!doctor) {
                res.status(404).json({ message: "Doctor not found" });
                return;
            }
            res.json(doctor);
        } catch (error) {
            next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const doctorData = req.body;
            const newDoctor = await doctorService.createDoctor(doctorData);
            res.status(201).json(newDoctor);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const updatedDoctor = await doctorService.updateDoctor(id, req.body);
            if (!updatedDoctor) {
                res.status(404).json({ message: "Doctor not found" });
                return;
            }
            res.json(updatedDoctor);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            await doctorService.deleteDoctor(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export const doctorController = new DoctorController();
