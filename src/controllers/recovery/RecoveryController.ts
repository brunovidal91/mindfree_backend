import { Request, Response } from "express";
import { RecoveryService } from "../../services/recovery/RecoveryService";

class RecoveryController{
    async handle(req: Request, res: Response){

        const { email } = req.body;

        const recoveryService = new RecoveryService();
        const recovery = await recoveryService.handle({email});

        res.json(recovery);
    }
}

export { RecoveryController }