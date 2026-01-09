import { Request, Response } from "express";
export declare class CategoriesController {
    static getCategories(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=categories.controller.d.ts.map