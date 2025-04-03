import { Request, Response } from "express";
import { admin } from "../../data/firebase";
import { mySub } from "../../utils/recoverySub";

import { CreateCaregoryService } from "../../services/categories/CreateCaregoryService";

class CreateCaregoryController{
    async handle(req: Request, res: Response){
        let userId = req.userId;
        const { title, isMonthly, day, isIncome } = req.body;

        if(day != "" && isNaN(day)){
            
            res.status(400).json({message: "o dia precisa ser numérico"});
            return
        }

        if(Number(day) < 1 || Number(day) > 31){

            res.status(400).json({message: "o dia precisa ser entre 1 e 31"});
            return

        }
        

        const createCategoryService = new CreateCaregoryService();
        const category = await createCategoryService.handle({userId, title, isMonthly, day, isIncome});

        
        res.json(category);
    }
}


export { CreateCaregoryController }