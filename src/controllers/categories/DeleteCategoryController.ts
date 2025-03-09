import { Request, Response } from "express";

import { DeleteCategoryService } from "../../services/categories/DeleteCategoryService";

class DeleteCategoryController{

    async handle(req: Request, res: Response){
        const userId = req.userId;
        const { id } = req.body;

        const deleteCategoryService = new DeleteCategoryService();
        const category = await deleteCategoryService.handle({id, userId});

        res.json(category);
    }
}

export { DeleteCategoryController }