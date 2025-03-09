import { Request, Response } from "express";

import { GetCategoriesService } from "../../services/categories/GetCategoriesService";

class GetCategoriesController{

    async handle(req: Request, res: Response){
        const userId = req.userId;
        const getCategoriesService = new GetCategoriesService();
        const categories = await getCategoriesService.handle({userId});

        res.json(categories);
    }
}

export { GetCategoriesController }