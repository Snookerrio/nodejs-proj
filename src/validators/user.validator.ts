import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserValidator {
  private static email = joi.string().regex(RegexEnum.EMAIL).trim();
  private static password = joi.string().regex(RegexEnum.PASSWORD);
  private static name = joi.string().regex(RegexEnum.NAME).trim();
  private static surname = joi.string().regex(RegexEnum.NAME).trim();

  public static create = joi.object({
    email: this.email.required(),
    password: this.password.required(),
    name: this.name.required(),
    surname: this.surname.required(),
  });

  public static update = joi.object({
    name: this.name.optional(),
    surname: this.surname.optional(),
    email: this.email.optional(),
    password: this.password.optional(),
  });

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
