import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { checkAccessToken, checkRole } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", checkAccessToken, checkRole(["admin"]), userController.getAll);
router.get(
  "/:id",
  checkAccessToken,
  checkRole(["admin"]),
  userController.getById,
);

router.put(
  "/:id",
  checkAccessToken,
  checkRole(["admin"]),
  validateRequest(UserValidator.update),
  userController.updateUser,
);

router.delete(
  "/:id",
  checkAccessToken,
  checkRole(["admin"]),
  userController.deleteUser,
);

export const userRouter = router;
