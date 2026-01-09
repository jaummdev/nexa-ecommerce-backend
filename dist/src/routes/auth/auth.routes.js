import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth.controller";
const router = Router();
// Rotas publicas
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
export default router;
//# sourceMappingURL=auth.routes.js.map