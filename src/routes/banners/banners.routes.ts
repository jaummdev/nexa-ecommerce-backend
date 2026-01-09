import { Router } from "express";
import { BannersController } from "../../controllers/banners/banners.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/client";

const router: Router = Router();

router.get("/", BannersController.getBanners);
router.post("/", auth(Role.ADMIN), BannersController.createBanner);
router.put("/:id", auth(Role.ADMIN), BannersController.updateBanner);
router.delete("/:id", auth(Role.ADMIN), BannersController.deleteBanner);

export default router;
