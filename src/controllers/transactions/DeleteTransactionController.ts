import { Request, Response } from "express";

import { DeleteTransactionService } from "../../services/transactions/DeleteTransactionService";

class DeleteTransactionController{

    async handle(req: Request, res: Response){
        const userId = req.userId;
        const { id } = req.body;

        const deleteTransactionService = new DeleteTransactionService();
        const transaction = await deleteTransactionService.handle({userId, id});

        res.json(transaction);
    }
}


export { DeleteTransactionController }