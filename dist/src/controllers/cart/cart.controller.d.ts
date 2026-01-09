import { Request, Response } from "express";
export declare class CartController {
    static getCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static addToCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=cart.controller.d.ts.map