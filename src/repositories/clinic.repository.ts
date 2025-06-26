import { FilterQuery, SortOrder } from "mongoose";

import { IClinic, IClinicQuery } from "../interfaces/clinic.interface";
import { Clinic } from "../models/clinic.model";

class ClinicRepository {
  public async getAll(query: IClinicQuery): Promise<IClinic[]> {
    const filter: FilterQuery<IClinic> = {};

    if (query.search) {
      filter.name = { $regex: query.search, $options: "i" };
    }

    if (query.service) {
      filter.services = query.service;
    }
    if (query.doctor) {
      filter.doctors = query.doctor;
    }

    const sort: Record<string, SortOrder> = {};
    if (query.order) {
      if (query.order.startsWith("-")) {
        sort[query.order.slice(1)] = -1;
      } else {
        sort[query.order] = 1;
      }
    }

    return await Clinic.find(filter)
      .sort(sort)
      .populate("doctors", "name")
      .populate("services", "name");
  }

  public async getById(id: string): Promise<IClinic | null> {
    return await Clinic.findById(id).populate("doctors").populate("services");
  }
  public async createClinic(data: IClinic): Promise<IClinic> {
    return await Clinic.create(data);
  }

  public async updateClinic(
    id: string,
    data: Partial<IClinic>,
  ): Promise<IClinic | null> {
    return await Clinic.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteClinic(id: string): Promise<void> {
    await Clinic.findByIdAndDelete(id);
  }
}

export const clinicRepository = new ClinicRepository();
