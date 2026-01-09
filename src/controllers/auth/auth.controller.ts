import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma.js";
import { Role } from "../../../generated/prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      if (role !== Role.CUSTOMER && role !== Role.ADMIN) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (user.role !== role) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET_KEY || "default-secret-key",
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          phone: user.phone || "",
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { email, password, name, phone } = req.body;
      const { admin } = req.query;

      if (admin) {
        if (!email || !password || !name) {
          return res.status(400).json({
            message: "Email, password and name are required for admin",
          });
        }
      } else {
        if (!email || !password || !name || !phone) {
          return res.status(400).json({
            message: "Email, password, name and phone are required",
          });
        }
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const userRole = admin ? Role.ADMIN : Role.CUSTOMER;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: userRole,
          name,
          phone: phone || "",
        },
      });

      return res.status(200).json({
        message: "Registration successful",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          phone: user.phone || "",
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  }
}
