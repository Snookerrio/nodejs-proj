import Joi from "joi";

export class ServiceValidator {
    private static name = Joi.string().min(2).max(100).trim();

    public static create = Joi.object({
        name: this.name.required(),
    });

    public static update = Joi.object({
        name: this.name.required(),
    });
}
