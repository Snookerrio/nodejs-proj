import { Router } from "express";
import { serviceController } from "../controllers/service.controller";
import { checkAccessToken, checkRole } from "../middlewares/auth.middleware";
import {validateRequest} from "../middlewares/validate.middleware";
import{ServiceValidator} from "../validators/service.validator";

const router = Router();


router.get("/", checkAccessToken, checkRole(["admin", "user"]), serviceController.getAll);


router.get("/:id", checkAccessToken, serviceController.getById);


router.post("/", checkAccessToken, checkRole(["admin"]), validateRequest(ServiceValidator.create),serviceController.createService);


router.put("/:id", checkAccessToken, checkRole(["admin"]), validateRequest(ServiceValidator.update), serviceController.updateService);


router.delete("/:id", checkAccessToken, checkRole(["admin"]), serviceController.deleteService);

export const serviceRouter = router;
