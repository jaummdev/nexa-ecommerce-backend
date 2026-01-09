import { Router } from "express";
import { OrdersController } from "../../controllers/orders/orders.controller";
import { auth } from "../../middlewares/auth";
const router = Router();
router.get("/", auth(), OrdersController.getOrders);
router.post("/", auth(), OrdersController.createOrder);
router.put("/:id", auth(), OrdersController.updateOrder);
router.delete("/:id", auth(), OrdersController.deleteOrder);
export default router;
//# sourceMappingURL=orders.routes.js.map