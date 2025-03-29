import { db } from "../../data/firebase";
import { auth, EmailAuthProvider, reauthenticateWithCredential, updateEmail } from '../../data/authfirebase';

interface User{
    id: string,
    name: string,
    email?: string,
    currentPassword: string

}


class UpdateUserService{
    async handle({id, name, email, currentPassword }: User){ 

        //Verificando se foi fornecido o nome
        if(!name){
            return {code: "400", message: "É obrigatório informar o nome", status: 400}
        }

        // Verificar se existe um usuário
        let currentUser = auth.currentUser;
 
        if(!currentUser){
            return {code: "400", message: "Não foi possível identificar o usuário", status: 401}
        }

        // Verificando se foi fornecida a senha
        if(!currentPassword){
            return {code: "400", message: "É obrigatório informar a senha atual", status: 400}
        }


        // O IF aqui está alterando o nome e email
        if(email && email != ""){
            try{

            // Validando as credenciais
    
            const credential = EmailAuthProvider.credential(currentUser.email as string, currentPassword)

            if(!credential?.providerId){

                return {code: "401", message: "Usuário não autenticado, verifique sua senha", status: 401}
            }

            // reautenticar o usuário
            
           await reauthenticateWithCredential(currentUser, credential);
        //    await updateEmail(currentUser, email);
           const usersRef = db.collection('users');
           await usersRef.doc(id).update({
                name,
                // email
            });
            return {code:"200", message: "Dados alterados com sucesso.", status: 200}



            // .then(() => {

            //     updateEmail(currentUser, email)
            //     .then( async () => {
     
     
            //      const usersRef = db.collection('users');
            //      await usersRef.doc(id).update({
            //          name,
            //          email
            //      });
     
     
            //      return {code:"200", message: "Dados alterados com sucesso.", status: 200}
            //     })
     
            //     .catch((error) => {
            //         return {code: "401", message: "Credenciais incorretas.", status: 401}
            //     })
            // }).catch((error) => {
            //     return {code: "401", message: "Credenciais incorretas.", status: 401}
            // })


            }catch(error){
                console.log(error)
                return {code: "401", message: "Não foi possível fazer a alteração. Verifique os dados informados.", status: 401}
            }


        }
        // O ELSE aqui está alterando apenas o nome
        else{

            try{

                // validar as credenciais do usuário
                const credential = EmailAuthProvider.credential(currentUser.email as string, currentPassword)

                if(!credential?.providerId){

                    return {code: "401", message: "Usuário não autenticado, verifique sua senha", status: 401}
                }
    
                // reautenticar
    
                await reauthenticateWithCredential(currentUser, credential);
                const usersRef = db.collection('users');
                await usersRef.doc(id).update({
                    name,
                });

                return {code:"200", message: "Nome alterado com sucesso.", status: 200}


                // .then(async () => {
    
                //     const usersRef = db.collection('users');
                //     const user = await usersRef.doc(id).update({
                //         name,
                //     });

                //     console.log("nome alterado")
                //     return {code:"200", message: "Nome alterado com sucesso.", status: 200}
    
                // })
                
                // .catch((error) => {
                //     console.log("Erro catch do then:"+error)
                //     const { code }:any = error;
                //     return {code, message: "Credenciais incorretas, verifique a senha", status: 401}
                // })

            }catch(error){
                console.log(error)

                return {code: "401", message: "Não foi possível fazer a alteração. Verifique suas credenciais.", status: 401}
            }

        }

    }
}


export { UpdateUserService }