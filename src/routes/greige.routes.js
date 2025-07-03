import Router from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import { createGreigeOrder } from "../controllers/greigeController/createGreigeOrder.controller.js";

const router = Router();

router.route("/create-greige-order").post(authentication, authorizeRoles("Admin", "GREIGE"), createGreigeOrder)

export default router;