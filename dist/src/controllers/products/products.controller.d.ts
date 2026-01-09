import { Request, Response } from "express";
export declare class ProductsController {
    static getProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=products.controller.d.ts.map