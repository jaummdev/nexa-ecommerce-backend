import { Role } from "../../generated/prisma/client";
import { Request, Response, NextFunction } from "express";
export declare function auth(requiredRole?: Role): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map