import { Request, Response } from "express";

import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController{

    async handle(req: Request, res: Response){

        const {name, email, password} = req.body;

        const createUserService = new CreateUserService();
        const user = await createUserService.handle({name, email, password});

        res.json(user);
    }
}


export { CreateUserController }