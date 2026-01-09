import { Router } from "express";
import { ProductsController } from "../../controllers/products/products.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/client";

const router: Router = Router();

router.get("/", ProductsController.getProducts);
router.post("/", auth(Role.ADMIN), ProductsController.createProduct);
router.put("/:id", auth(Role.ADMIN), ProductsController.updateProduct);
router.delete("/:id", auth(Role.ADMIN), ProductsController.deleteProduct);

export default router;
