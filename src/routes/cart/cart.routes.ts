import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { CartController } from "../../controllers/cart/cart.controller.js";

const router: Router = Router();

router.get("/", auth(), CartController.getCart);
router.post("/", auth(), CartController.addToCart);
router.put("/", auth(), CartController.updateCart);
router.delete("/", auth(), CartController.deleteCart);
router.delete("/items/:id", auth(), CartController.deleteCartItem);

export default router;
