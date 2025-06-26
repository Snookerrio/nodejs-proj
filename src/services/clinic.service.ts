import { IClinic, IClinicQuery } from "../interfaces/clinic.interface";
import { clinicRepository } from "../repositories/clinic.repository";

class ClinicService {
  public async getAll(query: IClinicQuery): Promise<IClinic[]> {
    return await clinicRepository.getAll(query);
  }

  public async getById(id: string): Promise<IClinic | null> {
    return await clinicRepository.getById(id);
  }

  public async createClinic(data: IClinic): Promise<IClinic> {
    return await clinicRepository.createClinic(data);
  }

  public async updateClinic(
    id: string,
    data: Partial<IClinic>,
  ): Promise<IClinic | null> {
    return await clinicRepository.updateClinic(id, data);
  }

  public async deleteClinic(id: string): Promise<void> {
    return await clinicRepository.deleteClinic(id);
  }
}

export const clinicService = new ClinicService();
