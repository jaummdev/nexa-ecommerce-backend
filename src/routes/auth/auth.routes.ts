import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth.controller.js";

const router: Router = Router();

// Rotas publicas
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;
