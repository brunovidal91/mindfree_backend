import { Request, Response } from "express";

import { LogoutService } from "../../services/logout/LogoutService";

class LogoutController{
    async handle(req: Request, res: Response){
        const logoutService = new LogoutService();
        const logout = await logoutService.handle();

        res.json(logout);
    }
}

export { LogoutController }