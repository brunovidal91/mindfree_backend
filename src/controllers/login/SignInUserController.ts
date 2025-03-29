import { Request, Response } from "express";

import { SignInUserService } from "../../services/login/SignInUserService";

class SignInUserController{

    async handle(req: Request, res: Response){

        const {email, password} = req.body;

        const signUserService = new SignInUserService();
        const user = await signUserService.handle({email, password})
        
        const { status }: any = user;


        res.status(status).json(user);
    }



}


export { SignInUserController }
