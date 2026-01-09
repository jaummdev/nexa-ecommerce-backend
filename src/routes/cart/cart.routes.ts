import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { CartController } from "../../controllers/cart/cart.controller.js";

const router: Router = Router();

router.get("/", auth(), CartController.getCart);
router.post("/", auth(), CartController.addToCart);
router.put("/:id", auth(), CartController.updateCart);
router.delete("/:id", auth(), CartController.deleteCart);

export default router;
