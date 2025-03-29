import { Request, Response } from "express";
import { UpdatePasswordService } from "../../services/users/UpdatePasswordService";

class UpdatePasswordController{
    async handle(req: Request, res: Response){

        const {currentPassword, newPassword} = req.body;

        const updatePasswordService = new UpdatePasswordService();
        const updatePassword: any = await updatePasswordService.handle({currentPassword, newPassword});

        const { status } = updatePassword;
        console.log("--------------- STATUS CONTROLLER: "+status);
        res.status(status).json(updatePassword);

    }
}


export { UpdatePasswordController } 