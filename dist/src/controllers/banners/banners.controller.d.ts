import { Request, Response } from "express";
export declare class BannersController {
    static getBanners(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=banners.controller.d.ts.map