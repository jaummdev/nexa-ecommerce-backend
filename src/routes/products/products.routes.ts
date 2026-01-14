import { Router } from "express";
import { ProductsController } from "../../controllers/products/products.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/client.js";

const router: Router = Router();

router.get("/", ProductsController.getProducts);
router.get("/:id", ProductsController.getProductById);
router.post("/", auth(Role.ADMIN), ProductsController.createProduct);
router.put("/:id", auth(Role.ADMIN), ProductsController.updateProduct);
router.delete("/:id", auth(Role.ADMIN), ProductsController.deleteProduct);

export default router;
