import { IDoctor, IDoctorQuery } from "../interfaces/doctor.interface";
import { doctorRepository } from "../repositories/doctor.repository";

class DoctorService {
  public async getAll(query: IDoctorQuery): Promise<IDoctor[]> {
    return await doctorRepository.getAll(query);
  }

  public async getById(id: string): Promise<IDoctor | null> {
    return await doctorRepository.getById(id);
  }

  public async createDoctor(data: IDoctor): Promise<IDoctor> {
    return await doctorRepository.createDoctor(data);
  }

  public async updateDoctor(
    id: string,
    data: Partial<IDoctor>,
  ): Promise<IDoctor | null> {
    return await doctorRepository.updateDoctor(id, data);
  }

  public async deleteDoctor(id: string): Promise<void> {
    return await doctorRepository.deleteDoctor(id);
  }
}

export const doctorService = new DoctorService();
