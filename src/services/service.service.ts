import {IService, IServiceQuery} from "../interfaces/service.interface";
import { serviceRepository } from "../repositories/service.repository";



class ServiceService {
    public async getAll(query: IServiceQuery): Promise<IService[]> {
        return serviceRepository.getAll(query);
    }

    public async getById(id: string): Promise<IService | null> {
        return serviceRepository.getById(id);
    }

    public async createService(data: IService): Promise<IService> {
        return serviceRepository.createService(data);
    }

    public async updateService(id: string, data: Partial<IService>): Promise<IService | null> {
        return serviceRepository.updateService(id, data);
    }

    public async deleteService(id: string): Promise<void> {
        return serviceRepository.deleteService(id);
    }
}

export const serviceService = new ServiceService();
