import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { router } from "./routes";
import cors = require('cors');


const app = express();
app.use(cors<Request>());
app.use(express.json());
const port = 3333;
app.use(router);


//Middleware de tratamento de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

    if(error instanceof Error){
        res.status(400).json({
            error: error.message
        })
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })

})

app.listen(port, () => {
    console.log("server running...")
})