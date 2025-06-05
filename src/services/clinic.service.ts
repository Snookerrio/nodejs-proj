import { clinicRepository } from "../repositories/clinic.repository";
import { IClinic, IClinicQuery } from "../interfaces/clinic.interface";

class ClinicService {
    public async getAll(query: IClinicQuery): Promise<IClinic[]> {
        return clinicRepository.getAll(query);
    }

    public async getById(id: string): Promise<IClinic | null> {
        return clinicRepository.getById(id);
    }

    public async createClinic(data: IClinic): Promise<IClinic> {
        return clinicRepository.createClinic(data);
    }

    public async updateClinic(id: string, data: Partial<IClinic>): Promise<IClinic | null> {
        return clinicRepository.updateClinic(id, data);
    }

    public async deleteClinic(id: string): Promise<void> {
        return clinicRepository.deleteClinic(id);
    }
}

export const clinicService = new ClinicService();
