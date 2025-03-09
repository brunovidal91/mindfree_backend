import { Request, Response } from "express";

import { DeleteUserService } from "../../services/users/DeleteUserService";


class DeleteUserController{
    async handle(req: Request, res: Response){

        const { id } = req.params;

        const deleteUserService = new DeleteUserService();
        const user = await deleteUserService.handle({id});

        res.json(user);
    }
}

export { DeleteUserController }