import { Request, Response } from "express";

import { GetCategoriesService } from "../../services/categories/GetCategoriesService";

class GetCategoriesController{

    async handle(req: Request, res: Response){
        const userId = req.userId;
        const getCategoriesService = new GetCategoriesService();
        const categoriesList = await getCategoriesService.handle({userId});

        const { status, categories }: any = categoriesList;

        res.status(status).json(categories);
    }
}

export { GetCategoriesController }