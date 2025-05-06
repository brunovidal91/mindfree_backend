tratamento de erros:
    yarn add express-async-errors 
    import 'express-async-errors'; --> sempre em importar em segundo lugar


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


--------------------------------------- alterar senha codigo completo


// Verificar se existe um usuário
        let currentUser = auth.currentUser;
 
        if(!currentUser){
            return {code: 400, message: "Não foi possível identificar o usuário"}
        }

        // Verificar se a nova senha está preenchida
        if(newPassword != "" && currentPassword != ""){

        // Caso preechida, verificar se a nova senha é válida

            if(newPassword && newPassword?.length < 6){
                return {code: 400, message: "A senha precisa ter pelo menos 6 caracteres"}
            }

        
        try{

            
            // validar a senha antiga
    
            const credential = EmailAuthProvider.credential(
                currentUser.email as string,
                currentPassword as string
            )

            if(!credential?.providerId){

                return {code: 401, message: "Usuário não autenticado, verifique sua senha"}
            }


    
            // reautenticar o usuário
            
            await reauthenticateWithCredential(currentUser, credential);
    
            // atualizar a senha
                
            await updatePassword(currentUser, newPassword as string);
    
            return {code: 200, message: "A senha foi alterada com sucesso!"}
    

        }catch(error){
            return error
        }
        
        }
    
--------------------------------------- alterar email codigo completo

------------- instalar o vercel na máquina:
npm install -g vercel
------------ fazendo deploy na vercel
comandos:
    vercel          --para configurar e fazer deploy em dev
    vercel --prod   --para subir pra prod


------------ vercel.json --------------
{"version": 2,
    "builds": [
        {
            "src": "./dist/server.js",
            "use": "@now/node"
        }
    ],
    "routes":[
        {
            "src": "/(.*)",
            "dest": "/dist/server.js"
        }
    ],}


    --
        "rewrites": [{ "source": "/(.*)", "destination": "/" }]