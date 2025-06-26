import Joi from "joi";

export class DoctorValidator {
  private static name = Joi.string().min(2).max(50).trim();
  private static surname = Joi.string().min(2).max(50).trim();
  private static email = Joi.string().email().trim();
  private static phone = Joi.string().pattern(/^\d{10,13}$/);
  private static clinics = Joi.array().items(Joi.string().hex().length(24));
  private static services = Joi.array().items(Joi.string().hex().length(24));

  public static create = Joi.object({
    name: this.name.required(),
    surname: this.surname.required(),
    email: this.email.required(),
    phone: this.phone.required(),
    clinics: this.clinics.required(),
    services: this.services.required(),
  });

  public static update = Joi.object({
    name: this.name.optional(),
    surname: this.surname.optional(),
    email: this.email.optional(),
    phone: this.phone.optional(),
    clinics: this.clinics.optional(),
    services: this.services.optional(),
  });
}
