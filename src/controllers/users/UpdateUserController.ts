import { Request, Response } from "express";

import { UpdateUserService } from "../../services/users/UpdateUserService";


class UpdateUserController{
    async handle(req: Request, res: Response){
        const { id } = req.params;
        const { name, email, currentPassword } = req.body;

        const updateUserService = new UpdateUserService();
        const user = await updateUserService.handle({id, name, email, currentPassword});

        const { status }: any = user;

        res.status(status).json(user);

    }
}


export { UpdateUserController }


