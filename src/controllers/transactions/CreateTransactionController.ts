import { Request, Response } from "express";

import { CreateTransactionServices } from "../../services/transactions/CreateTransactionServices";

class CreateTransactionController{

    async handle(req: Request, res: Response){
        const userId = req.userId;
        const {title, value, category} = req.body;

        const createTransactionServices = new CreateTransactionServices();
        const transaction = await createTransactionServices.handle({title, category, value, userId});

        res.json(transaction);
    }
}

export { CreateTransactionController }