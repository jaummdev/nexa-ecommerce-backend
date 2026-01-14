import { prisma } from "../../../lib/prisma.js";
import { Request, Response } from "express";
import { LIMITS } from "../../config/limits.js";

export class ProductsController {
  static async getProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
      });
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ message: "Product ID is required to get a product" });
      }

      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ product });
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

      // Check product limit
      const productCount = await prisma.product.count();
      if (productCount >= LIMITS.PRODUCTS.MAX) {
        return res.status(400).json({
          message: LIMITS.PRODUCTS.MESSAGE,
        });
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
        include: {
          category: true,
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
        isActive,
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

      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found to update" });
      }

      const updatedProduct = await prisma.product.update({
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
          isActive,
        },
        include: {
          category: true,
        },
      });
      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
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

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}
