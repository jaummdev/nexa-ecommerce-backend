import { Role } from "../../generated/prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface CustomJwtPayload extends JwtPayload {
  role: Role;
  userId: string;
}

export function auth(requiredRole?: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ message: "Authorization header is required" });
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ message: "Invalid authorization format. Use: Bearer <token>" });
    }

    const token = parts[1];

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "default-secret-key"
      ) as CustomJwtPayload;

      if (!payload.userId || !payload.role) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      if (requiredRole && payload.role !== requiredRole) {
        return res.status(401).json({
          message:
            "Unauthorized. You do not have permission to access this resource",
        });
      }

      (req as Request & { user: CustomJwtPayload }).user = payload;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid token" });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
