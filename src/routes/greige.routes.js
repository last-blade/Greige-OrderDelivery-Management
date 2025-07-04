import Router from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import { createGreigeOrder } from "../controllers/greigeController/createGreigeOrder.controller.js";
import { getGreigeOrders } from "../controllers/greigeController/getGreigeOrders.controller.js";
import { editGreigeOrder } from "../controllers/greigeController/editGreigeOrder.controller.js";
import { filterGreigeOrder } from "../controllers/greigeController/filterGreigeOrder.controller.js";
import { deleteGreigeOrder } from "../controllers/greigeController/deleteGreigeOrder.controller.js";
import { viewGreigeOrder } from "../controllers/greigeController/viewGreigeOrder.controller.js";
import { createComment } from "../controllers/commentControllers/createComment.controller.js";
import { getComments } from "../controllers/commentControllers/getComments.controller.js";

const router = Router();

//POST
router.route("/create-greige-order").post(authentication, authorizeRoles("Admin", "GREIGE"), createGreigeOrder)

//GET
router.route("/greige-orders").get(authentication, getGreigeOrders);
router.route("/filter-orders").post(authentication, filterGreigeOrder);
router.route("/greige-order/:orderId").get(authentication, viewGreigeOrder);
router.route("/comment/create-comment/:orderId").post(authentication, createComment);
router.route("/comment/fetch-comments/:orderId").get(authentication, getComments);

//PUT
router.route("/edit-greige-order/:orderId").put(authentication, authorizeRoles("Admin", "GREIGE"), editGreigeOrder);

//DELETE
router.route("/delete-greige-order/:orderId").delete(authentication, authorizeRoles("Admin", "GREIGE"), deleteGreigeOrder);

export default router;