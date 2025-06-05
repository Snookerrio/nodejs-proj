import Joi from "joi";

export class ClinicValidator {
    private static name = Joi.string().min(2).max(100).trim();
    private static services = Joi.array().items(Joi.string().hex().length(24));
    private static doctors = Joi.array().items(Joi.string().hex().length(24));

    public static create = Joi.object({
        name: this.name.required(),
        services: this.services.required(),
        doctors: this.doctors.required(),
    });

    public static update = Joi.object({
        name: this.name.optional(),
        services: this.services.optional(),
        doctors: this.doctors.optional(),
    });
}
