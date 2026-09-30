import express from "express";
import {
  getMeController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from "../controller/auth.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../validators/auth.validator.js";
import { authentication } from "../middleware/auth.middleware.js";

const router = express.Router();

// === APIs Routers ===
router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);
router.post("/refresh", refreshTokenController);
router.post("/logout", authentication, logoutController);
router.get("/me", authentication, getMeController);

export default router;
