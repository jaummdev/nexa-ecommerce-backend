import { Router } from "express";
import { CategoriesController } from "../../controllers/categories/categories.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/client";

const router: Router = Router();

router.get("/", CategoriesController.getCategories);
router.post("/", auth(Role.ADMIN), CategoriesController.createCategory);
router.put("/:id", auth(Role.ADMIN), CategoriesController.updateCategory);
router.delete("/:id", auth(Role.ADMIN), CategoriesController.deleteCategory);

export default router;
