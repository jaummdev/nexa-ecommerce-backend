import { JwtPayload } from "jsonwebtoken";
import type { Role } from "../../generated/prisma/client.js";

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
