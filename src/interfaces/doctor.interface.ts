export interface IDoctor {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  clinics: string[];
  createdAt: Date;
  updatedAt: Date;
  services: string[];
}

export interface IDoctorQuery {
  search?: string;
  order?: "name" | "-name" | "surname" | "-surname";
}
