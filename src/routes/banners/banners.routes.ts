import { Router } from "express";
import { BannersController } from "../../controllers/banners/banners.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/client";

const router: Router = Router();

router.get("/", auth(Role.ADMIN), BannersController.getBanners);
router.post("/", auth(Role.ADMIN), BannersController.createBanner);

export default router;
