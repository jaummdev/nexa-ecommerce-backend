import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { CartController } from "../../controllers/cart/cart.controller";
const router = Router();
router.get("/", auth(), CartController.getCart);
router.post("/", auth(), CartController.addToCart);
router.put("/:id", auth(), CartController.updateCart);
router.delete("/:id", auth(), CartController.deleteCart);
export default router;
//# sourceMappingURL=cart.routes.js.map