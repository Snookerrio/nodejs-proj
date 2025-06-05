import { Router } from "express";

import { checkAccessToken, checkRole } from "../middlewares/auth.middleware";
import {doctorController} from "../controllers/doctor.controller";
import {validateRequest} from "../middlewares/validate.middleware";
import {DoctorValidator} from "../validators/doctor.validator";


const router = Router();

router.get("/", checkAccessToken, checkRole(["admin", "user"]), doctorController.getAll);
router.get("/:id", checkAccessToken, doctorController.getById);
router.post("/", checkAccessToken, checkRole(["admin"]), validateRequest(DoctorValidator.create), doctorController.create);
router.put("/:id", checkAccessToken, checkRole(["admin"]), validateRequest(DoctorValidator.update), doctorController.update);
router.delete("/:id", checkAccessToken, checkRole(["admin"]), doctorController.delete);

export const doctorRouter = router;
