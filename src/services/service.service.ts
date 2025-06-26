import { IService, IServiceQuery } from "../interfaces/service.interface";
import { serviceRepository } from "../repositories/service.repository";

class ServiceService {
  public async getAll(query: IServiceQuery): Promise<IService[]> {
    return await serviceRepository.getAll(query);
  }

  public async getById(id: string): Promise<IService | null> {
    return await serviceRepository.getById(id);
  }

  public async createService(data: IService): Promise<IService> {
    return await serviceRepository.createService(data);
  }

  public async updateService(
    id: string,
    data: Partial<IService>,
  ): Promise<IService | null> {
    return await serviceRepository.updateService(id, data);
  }

  public async deleteService(id: string): Promise<void> {
    return await serviceRepository.deleteService(id);
  }
}

export const serviceService = new ServiceService();
