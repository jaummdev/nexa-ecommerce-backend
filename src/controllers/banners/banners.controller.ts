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
      return res
        .status(200)
        .json({ message: "Banner created successfully", banner });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  }

  static async updateBanner(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, image_url } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Banner ID is required to update" });
      }

      const banner = await prisma.banner.findUnique({
        where: { id: Number(id) },
      });
      if (!banner) {
        return res.status(404).json({ message: "Banner not found to update" });
      }

      const updatedBanner = await prisma.banner.update({
        where: { id: Number(id) },
        data: { title, image_url },
      });
      return res
        .status(200)
        .json({ message: "Banner updated successfully", updatedBanner });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  }

  static async deleteBanner(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Banner ID is required to delete" });
      }

      const banner = await prisma.banner.findUnique({
        where: { id: Number(id) },
      });

      if (!banner) {
        return res.status(404).json({ message: "Banner not found to delete" });
      }

      await prisma.banner.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  }
}
