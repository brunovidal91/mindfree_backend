import { auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from '../../data/authfirebase';

interface User{
    currentPassword: string,
    newPassword: string
}


class UpdatePasswordService{
    async handle({currentPassword, newPassword}: User){

        //Pegar o usuário atual
        const currentUser = auth.currentUser;

        //Verificar se existe um usuário
        if(!currentUser){
            console.log("1")
            return {code: "403", message: "Não foi possível identificar o usuário.", status: 403}
        }

        //Validar se as senhas foram fornecidas
        if(!currentPassword || !newPassword){
            console.log("2")
            return {code: 400, message: "É necessário informar ambas as senhas.", status: 400}
        }

        if(currentPassword == newPassword){
            console.log("8")
            return {code: 400, message: "A nova senha deve ser diferente da atual.", status: 400}
        }

        //Verificar se a nova senha é válida
        if(newPassword.length < 6){
            console.log("3")

            const response: object = {code: 400, message: "A nova senha deve conter no mínimo 6 caracteres.", status: 401}; 

            return response;
        }

        try{
            //Reautenticar o usuário


            await reauthenticateWithCredential(currentUser, EmailAuthProvider.credential(currentUser.email as string, currentPassword))
            await updatePassword(currentUser, newPassword);
            const response: object = {code: "200", message: "A senha foi alterada com sucesso!", status: 200}
            return response


        }catch(error){
            console.log("7");
            return {code: "401", message: "Não foi possível fazer a alteração. Verifique se a senha atual está correta.", status: 401};
        }

    }
}

export { UpdatePasswordService }