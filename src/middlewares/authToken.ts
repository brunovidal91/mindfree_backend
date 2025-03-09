import { Request, Response, NextFunction } from "express";
import { admin } from "../data/firebase";


const authToken = (async (req: Request, res: Response, next: NextFunction) => {

    const jwt = req.headers.authorization;
    if(!jwt){
        res.status(401).json({messsage: "usuário não autorizado"});
        return;
    }
    
    let userToken;
    try{
        
        userToken = await admin.auth().verifyIdToken(jwt.split(' ')[1], true);

        const { sub } = userToken;
        req.userId = sub;
        return next();
        
    }catch(error){
        console.log(error)
        res.status(401).json({messsage: "usuário não autorizado"});
    }

})


export { authToken }