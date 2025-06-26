import { Router } from "express";

import { clinicController } from "../controllers/clinic.controller";
import { checkAccessToken, checkRole } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { ClinicValidator } from "../validators/clinic.validator";

const router = Router();

router.get(
  "/",
  checkAccessToken,
  checkRole(["admin", "user"]),
  clinicController.getAll,
);

router.get("/:id", clinicController.getById);

router.post(
  "/",
  checkAccessToken,
  checkRole(["admin"]),
  validateRequest(ClinicValidator.create),
  clinicController.createClinic,
);

router.put(
  "/:id",
  checkAccessToken,
  checkRole(["admin"]),
  validateRequest(ClinicValidator.update),
  clinicController.updateClinic,
);

router.delete(
  "/:id",
  checkAccessToken,
  checkRole(["admin"]),
  clinicController.deleteClinic,
);

export const clinicRouter = router;
