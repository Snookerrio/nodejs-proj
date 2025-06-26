import { FilterQuery } from "mongoose";

import { IDoctor, IDoctorQuery } from "../interfaces/doctor.interface";
import { Doctor } from "../models/doctor.model";

class DoctorRepository {
  public async getAll(query: IDoctorQuery): Promise<IDoctor[]> {
    const filter: FilterQuery<IDoctor> = {};

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { surname: { $regex: query.search, $options: "i" } },
        { phone: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }

    const sort: Record<string, 1 | -1> = {};
    if (query.order) {
      const field = query.order.startsWith("-")
        ? query.order.slice(1)
        : query.order;
      const direction = query.order.startsWith("-") ? -1 : 1;

      if (field === "name" || field === "surname") {
        sort[field] = direction;
      }
    }

    return await Doctor.find(filter)
      .sort(sort)
      .populate("clinics", "name")
      .populate("services", "name");
  }

  public async getById(id: string): Promise<IDoctor | null> {
    return await Doctor.findById(id).populate("clinics").populate("services");
  }

  public async createDoctor(data: IDoctor): Promise<IDoctor> {
    const created = await Doctor.create(data);
    return await (await created.populate("clinics")).populate("services");
  }

  public async updateDoctor(
    id: string,
    data: Partial<IDoctor>,
  ): Promise<IDoctor | null> {
    return await Doctor.findByIdAndUpdate(id, data, { new: true })
      .populate("clinics")
      .populate("services");
  }

  public async deleteDoctor(id: string): Promise<void> {
    await Doctor.findByIdAndDelete(id);
  }
}

export const doctorRepository = new DoctorRepository();
