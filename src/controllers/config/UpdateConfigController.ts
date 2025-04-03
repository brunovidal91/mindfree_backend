import { Request, Response } from "express";
import { UpdateConfigService } from "../../services/config/UpdateConfigService";

class UpdateConfigController{
    async handle(req: Request, res: Response){
        const id = req.userId;
        const { currentYear, investmentRate } = req.body;

        const configService = new UpdateConfigService();
        const config = await configService.handle({id, currentYear, investmentRate});

        const { status }: any = config;
        res.status(status).json(config); 
    }
}

export { UpdateConfigController }