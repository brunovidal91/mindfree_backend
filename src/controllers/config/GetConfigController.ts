import { Request, Response } from "express";
import { GetConfigService } from "../../services/config/GetConfigService";

class GetConfigController{
    async handle(req: Request, res: Response){
        const id = req.userId;

        const getConfigService = new GetConfigService();
        const configList = await getConfigService.handle({id});

        const {status, config}: any = configList;

        res.status(status).json(config)

    }
}

export { GetConfigController }