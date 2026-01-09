import { prisma } from "../../../lib/prisma";
import type { Request, Response } from "express";

export class CategoriesController {
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const { name, slug, description } = req.body;
      const category = await prisma.category.create({
        data: { name, slug, description },
      });
      return res
        .status(200)
        .json({ message: "Category created successfully", category });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, slug, description } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Category ID is required to update" });
      }

      const category = await prisma.category.findUnique({
        where: { id: id as string },
      });

      if (!category) {
        return res
          .status(404)
          .json({ message: "Category not found to update" });
      }

      const updatedCategory = await prisma.category.update({
        where: { id: id as string },
        data: { name, slug, description },
      });

      return res
        .status(200)
        .json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Category ID is required to delete" });
      }

      const category = await prisma.category.findUnique({
        where: { id: id as string },
      });
      if (!category) {
        return res
          .status(404)
          .json({ message: "Category not found to delete" });
      }
      await prisma.category.delete({
        where: { id: id as string },
      });
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}
