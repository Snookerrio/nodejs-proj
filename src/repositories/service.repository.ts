import { FilterQuery, SortOrder } from "mongoose";
// @ts-ignore
import {Service} from "../models/Service.model";
import {IService, IServiceQuery} from "../interfaces/service.interface";




 class ServiceRepository {
    public async getAll(query: IServiceQuery): Promise<IService[]> {
        const filter: FilterQuery<IService> = {};

        if (query.search) {
            filter.name = { $regex: query.search, $options: "i" };
        }

        const sort: Record<string, SortOrder> = {};
        if (query.order) {
            if (query.order.startsWith("-")) {
                sort[query.order.slice(1)] = -1;
            } else {
                sort[query.order] = 1;
            }
        }

        return Service.find(filter).sort(sort);
    }

    public async getById(id: string): Promise<IService | null> {
        return Service.findById(id);
    }

    public async createService(data: IService): Promise<IService> {
        return Service.create(data);
    }

    public async updateService(id: string, data: Partial<IService>): Promise<IService | null> {
        return Service.findByIdAndUpdate(id, data, { new: true });
    }

    public async deleteService(id: string): Promise<void> {
        await Service.findByIdAndDelete(id);
    }
}

export const serviceRepository= new ServiceRepository()