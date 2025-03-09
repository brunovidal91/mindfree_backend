import { Request, Response } from "express";
import { admin } from "../data/firebase";

const mySub = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({message: "usuário não autorizado!"});
        return;
    }
    let userId; 
    try{
        
        const { sub } = await admin.auth().verifyIdToken(token.split(' ')[1], true);
        userId = sub;

    }catch(error) {
        res.status(401).json({message: "usuário não autorizado!"});
        return;
    }

    return userId;

}

export { mySub }