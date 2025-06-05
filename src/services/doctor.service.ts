import { IDoctor, IDoctorQuery } from "../interfaces/doctor.interface";
import { doctorRepository } from "../repositories/doctor.repository";

class DoctorService {
    public async getAll(query: IDoctorQuery): Promise<IDoctor[]> {
        return doctorRepository.getAll(query);
    }

    public async getById(id: string): Promise<IDoctor | null> {
        return doctorRepository.getById(id);
    }

    public async createDoctor(data: IDoctor): Promise<IDoctor> {
        return doctorRepository.createDoctor(data);
    }

    public async updateDoctor(id: string, data: Partial<IDoctor>): Promise<IDoctor | null> {
        return doctorRepository.updateDoctor(id, data);
    }

    public async deleteDoctor(id: string): Promise<void> {
        return doctorRepository.deleteDoctor(id);
    }
}

export const doctorService = new DoctorService();
