import { Response, Request } from "express";
import { GetUsersService } from "../../services/users/GetUsersService";

class GetUsersController{
    async handle(req: Request, res: Response){

        const getUsersService = new GetUsersService();
        const users = await getUsersService.handle();


        res.json(users); 
    }
}


export { GetUsersController }