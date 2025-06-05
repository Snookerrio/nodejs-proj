
import { Schema, model, Types } from 'mongoose';
import {IClinic} from "../interfaces/clinic.interface";

const clinicSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        services: [{ type: Types.ObjectId, ref: 'Service' }],
        doctors:[{type: Types.ObjectId, ref: 'Doctor'}],
    },
    { timestamps: true, versionKey: false }
);

export const Clinic = model<IClinic>('Clinic', clinicSchema);
