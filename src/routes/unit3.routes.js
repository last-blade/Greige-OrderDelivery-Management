import Router from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { createUnit3Order } from "../controllers/unit3Controllers/createUnit3Order.controller.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import { editUnit3Order } from "../controllers/unit3Controllers/editUnit3Order.controller.js";

const router = Router();

//POST
router.route("/create-unit3-order/:orderId").post(authentication, authorizeRoles("Admin", "UNIT3"), createUnit3Order);

//PUT
router.route("/edit-unit3-order/:orderId").put(authentication, authorizeRoles("Admin", "UNIT3"), editUnit3Order);


export default router;