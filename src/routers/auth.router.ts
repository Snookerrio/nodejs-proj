import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { checkAccessToken } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  validateRequest(UserValidator.create),
  authController.register,
);

router.post(
  "/login",
  validateRequest(UserValidator.login),
  authController.login,
);

router.post(
  "/reset-password/:id",
  checkAccessToken,
  authController.resetPassword,
);

export const authRouter = router;
