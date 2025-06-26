import { NextFunction, Request, Response } from "express";

import { IServiceQuery } from "../interfaces/service.interface";
import { serviceService } from "../services/service.service";

class ServiceController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const query: IServiceQuery = req.query;
      const isAdmin = req.user?.role === "admin";

      const hasSearchParams = query.search || query.order;

      if (!isAdmin && !hasSearchParams) {
        res.status(403).json({
          message:
            "Access denied. Regular users must use search or order filters.",
        });
      }
      const services = await serviceService.getAll(query);
      res.json(services);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id;
      const service = await serviceService.getById(id);
      if (!service) {
        res.status(404).json({ message: "Service not found" });
        return;
      }
      res.json(service);
    } catch (error) {
      next(error);
    }
  }

  public async createService(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body;
      const newService = await serviceService.createService(data);
      res.status(201).json(newService);
    } catch (error) {
      next(error);
    }
  }

  public async updateService(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedService = await serviceService.updateService(id, data);
      if (!updatedService) {
        res.status(404).json({ message: "Service not found" });
        return;
      }
      res.json(updatedService);
    } catch (error) {
      next(error);
    }
  }

  public async deleteService(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id;
      await serviceService.deleteService(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const serviceController = new ServiceController();
