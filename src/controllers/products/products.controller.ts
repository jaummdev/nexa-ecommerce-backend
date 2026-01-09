import { prisma } from "../../../lib/prisma";
import type { Request, Response } from "express";

export class ProductsController {
  static async getProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async createProduct(req: Request, res: Response) {
    try {
      const {
        name,
        description,
        price,
        stock,
        images,
        reviewsQuantity,
        reviewsAvg,
        categoryId,
      } = req.body;

      if (
        !name ||
        !description ||
        !price ||
        !stock ||
        !images ||
        !reviewsQuantity ||
        !reviewsAvg ||
        !categoryId
      ) {
        return res
          .status(400)
          .json({ message: "All fields are required to create a product" });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
          images,
          reviewsQuantity,
          reviewsAvg,
          categoryId,
        },
      });

      return res
        .status(200)
        .json({ message: "Product created successfully", product });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        price,
        stock,
        images,
        reviewsQuantity,
        reviewsAvg,
        categoryId,
      } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Product ID is required to update" });
      }

      if (
        !name ||
        !description ||
        !price ||
        !stock ||
        !images ||
        !reviewsQuantity ||
        !reviewsAvg ||
        !categoryId
      ) {
        return res
          .status(400)
          .json({ message: "All fields are required to update a product" });
      }

      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          stock,
          images,
          reviewsQuantity,
          reviewsAvg,
          categoryId,
        },
      });
      return res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ message: "Product ID is required to delete" });
      }

      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found to delete" });
      }

      await prisma.product.delete({
        where: { id },
      });

      return res
        .status(200)
        .json({ message: "Product deleted successfully", product });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}
