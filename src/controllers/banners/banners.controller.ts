import { prisma } from "../../../lib/prisma";
import type { Request, Response } from "express";

export class BannersController {
  static async getBanners(req: Request, res: Response) {
    try {
      const banners = await prisma.banner.findMany();
      return res.status(200).json({ banners });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createBanner(req: Request, res: Response) {
    try {
      const { title, image_url } = req.body;
      const banner = await prisma.banner.create({
        data: { title, image_url },
      });
      return res.status(200).json({ banner });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
