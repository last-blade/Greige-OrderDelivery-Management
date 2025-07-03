import Router from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import { createGreigeOrder } from "../controllers/greigeController/createGreigeOrder.controller.js";
import { getGreigeOrders } from "../controllers/greigeController/getGreigeOrders.controller.js";

const router = Router();

//POST
router.route("/create-greige-order").post(authentication, authorizeRoles("Admin", "GREIGE"), createGreigeOrder)

//GET
router.route("/greige-orders").get(authentication, getGreigeOrders);

export default router;