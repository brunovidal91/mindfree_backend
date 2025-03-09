import { Request, Response } from "express";
import { MeService } from "../../services/me/MeService";
 
class MeController{
    
    async handle(req: Request, res: Response){
        
        const id = req.userId;
        const meService = new MeService();
        const me = await meService.handle({id});

        res.json(me);

    }
}

export { MeController }