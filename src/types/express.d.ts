import { JwtPayload } from "jsonwebtoken";
import type { Role } from "../../generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        role: Role;
      } & JwtPayload;
    }
  }
}

export {};
