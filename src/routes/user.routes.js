import Router from "express";
import { loginUser } from "../controllers/userControllers/longinUser.controller.js";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;