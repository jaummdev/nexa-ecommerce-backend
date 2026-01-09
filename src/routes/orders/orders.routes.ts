import { Router } from "express";
import { OrdersController } from "../../controllers/orders/orders.controller.js";
import { auth } from "../../middlewares/auth.js";

const router: Router = Router();

router.get("/", auth(), OrdersController.getOrders);
router.post("/", auth(), OrdersController.createOrder);

router.put("/:id", auth(), OrdersController.updateOrder);
router.delete("/:id", auth(), OrdersController.deleteOrder);

export default router;
