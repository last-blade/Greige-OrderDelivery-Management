import Router from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { createUnit3Order } from "../controllers/unit3Controllers/createUnit3Order.controller.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";

const router = Router();

//POST
router.route("/create-unit3-order/:orderId").post(authentication, authorizeRoles("Admin", "UNIT3"), createUnit3Order);

//GET


export default router;