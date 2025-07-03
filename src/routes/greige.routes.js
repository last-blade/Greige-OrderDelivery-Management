import Router from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import { createGreigeOrder } from "../controllers/greigeController/createGreigeOrder.controller.js";
import { getGreigeOrders } from "../controllers/greigeController/getGreigeOrders.controller.js";
import { editGreigeOrder } from "../controllers/greigeController/editGreigeOrder.controller.js";

const router = Router();

//POST
router.route("/create-greige-order").post(authentication, authorizeRoles("Admin", "GREIGE"), createGreigeOrder)

//GET
router.route("/greige-orders").get(authentication, getGreigeOrders);

//PUT
router.route("/edit-greige-order/:orderId").put(authentication, editGreigeOrder);

export default router;