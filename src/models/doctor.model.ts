import { model, Schema, Types } from "mongoose";

import { IDoctor } from "../interfaces/doctor.interface";

const doctorSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    clinics: [{ type: Types.ObjectId, ref: "Clinic" }],
    services: [{ type: Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true, versionKey: false },
);
export const Doctor = model<IDoctor>("Doctor", doctorSchema);
