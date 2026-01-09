import { Prisma, OrderStatus, Role } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import type { Request, Response } from "express";

export class OrdersController {
  static async getOrders(req: Request, res: Response) {
    try {
      const { userId } = req.user;

      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json({ orders });
    } catch (error) {
      console.error("Error getting orders:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async createOrder(req: Request, res: Response) {
    try {
      const { userId } = req.user;

      // Buscar o carrinho do usuário com os itens e produtos
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

      if (!cart.items || cart.items.length === 0) {
        return res.status(400).json({
          message: "Cart is empty. Add items to cart before creating an order",
        });
      }

      // Calcular o totalAmount baseado nos produtos do carrinho
      const totalAmount = cart.items.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
      }, 0);

      if (userId !== cart.userId) {
        return res.status(403).json({
          message: "You don't have permission to create an order for this cart",
        });
      }

      // Criar o pedido com os itens do carrinho
      const order = await prisma.order.create({
        data: {
          userId,
          totalAmount: new Prisma.Decimal(totalAmount),
          status: OrderStatus.PENDING,
          orderItems: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: new Prisma.Decimal(item.product.price),
            })),
          },
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          total: new Prisma.Decimal(0),
        },
      });

      return res.status(201).json({
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async updateOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { userId } = req.user;

      if (!id) {
        return res.status(400).json({
          message: "Order ID is required",
        });
      }

      if (!status) {
        return res.status(400).json({
          message: "Status is required",
        });
      }

      // Validar se o status é válido
      if (!Object.values(OrderStatus).includes(status)) {
        return res.status(400).json({
          message: `Invalid status. Must be one of: ${Object.values(
            OrderStatus
          ).join(", ")}`,
        });
      }

      // Buscar o pedido
      const existingOrder = await prisma.order.findUnique({
        where: { id, userId },
      });

      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (existingOrder.userId !== userId) {
        return res.status(403).json({
          message: "You don't have permission to update this order",
        });
      }

      // Atualizar o pedido
      const updatedOrder = await prisma.order.update({
        where: { id, userId },
        data: { status },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      return res.status(200).json({
        message: "Order updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.user;

      if (!id) {
        return res.status(400).json({
          message: "Order ID is required",
        });
      }

      // Buscar o pedido
      const existingOrder = await prisma.order.findUnique({
        where: { id, userId },
      });

      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (existingOrder.userId !== userId) {
        return res.status(403).json({
          message: "You don't have permission to delete this order",
        });
      }

      // Clientes só podem deletar pedidos pendentes
      if (existingOrder.status !== OrderStatus.PENDING) {
        return res.status(400).json({
          message: "You can only delete pending orders",
        });
      }

      // Deletar o pedido (os OrderItems serão deletados em cascata se configurado)
      await prisma.order.delete({
        where: { id, userId },
      });

      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}
