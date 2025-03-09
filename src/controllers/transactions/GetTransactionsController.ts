import { Request, Response } from "express";

import { GetTransactionsService } from "../../services/transactions/GetTransactionsService";

class GetTransactionsController{

    
    async handle(req: Request, res: Response){

        const userId = req.userId;
        const { date, datareq, month, year } = req.body;
        const getTransactionsService = new GetTransactionsService();
        const transactions = await getTransactionsService.handle({userId, date, datareq, month, year});

        res.json(transactions);
    }
}

export { GetTransactionsController }