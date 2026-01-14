import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../../lib/prisma.js";
import { Request, Response } from "express";

export class CartController {
  static async getCart(req: Request, res: Response) {
    try {
      const { userId } = req.user;

      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      return res.status(200).json({ cart });
    } catch (error) {
      console.error("Error getting cart:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async addToCart(req: Request, res: Response) {
    try {
      const { items } = req.body;
      const { userId } = req.user;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          message: "Items are required and must be a non-empty array",
        });
      }

      // Validar que cada item tem productId e quantity
      for (const item of items) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
          return res.status(400).json({
            message:
              "Each item must have productId and quantity (greater than 0)",
          });
        }
      }

      // Verificar se os produtos existem
      const productIds = items.map((item) => item.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      if (products.length !== productIds.length) {
        return res.status(400).json({
          message: "One or more products not found",
        });
      }

      // Calcular o total: soma de (preço * quantidade) de cada item
      const total = items.reduce((acc: number, item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return acc;
        return acc + Number(product.price) * item.quantity;
      }, 0);

      // Verificar se o carrinho já existe
      const existingCart = await prisma.cart.findUnique({
        where: { userId },
      });

      let cart;

      if (existingCart) {
        // Se o carrinho já existe, atualizar os itens
        // Primeiro, deletar os itens existentes
        await prisma.cartItem.deleteMany({
          where: { cartId: existingCart.id },
        });

        // Depois, criar os novos itens e atualizar o total
        cart = await prisma.cart.update({
          where: { id: existingCart.id },
          data: {
            total: new Prisma.Decimal(total),
            items: {
              create: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      } else {
        // Se não existe, criar o carrinho com os itens e o total
        cart = await prisma.cart.create({
          data: {
            userId,
            total: new Prisma.Decimal(total),
            items: {
              create: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      }

      return res.status(201).json({
        message: existingCart
          ? "Cart updated successfully"
          : "Cart created successfully",
        cart,
      });
    } catch (error) {
      console.error("Error creating cart:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async updateCart(req: Request, res: Response) {
    try {
      const { items } = req.body;
      const { userId } = req.user;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          message: "Items are required and must be a non-empty array",
        });
      }

      const existingCart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!existingCart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Validar que cada item tem productId e quantity
      for (const item of items) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
          return res.status(400).json({
            message:
              "Each item must have productId and quantity (greater than 0)",
          });
        }
      }

      // Verificar se os produtos existem
      const productIds = items.map((item) => item.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      if (products.length !== productIds.length) {
        return res.status(400).json({
          message: "One or more products not found",
        });
      }

      // Calcular o total: soma de (preço * quantidade) de cada item
      const total = items.reduce((acc: number, item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return acc;
        return acc + Number(product.price) * item.quantity;
      }, 0);

      // Deletar os itens existentes antes de criar os novos
      await prisma.cartItem.deleteMany({
        where: { cartId: existingCart.id },
      });

      const cart = await prisma.cart.update({
        where: { userId },
        data: {
          total: new Prisma.Decimal(total),
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return res
        .status(200)
        .json({ message: "Cart updated successfully", cart });
    } catch (error) {
      console.error("Error updating cart:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async deleteCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.user;

      if (!id) {
        return res.status(400).json({
          message: "Cart ID is required",
        });
      }

      const existingCart = await prisma.cart.findUnique({
        where: { id, userId },
      });

      if (!existingCart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      await prisma.cart.delete({
        where: { id, userId },
      });

      return res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      console.error("Error deleting cart:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}
