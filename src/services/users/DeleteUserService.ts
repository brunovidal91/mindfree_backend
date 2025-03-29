import { db, admin } from "../../data/firebase";

interface User {
    id: string
}

class DeleteUserService{

    async handle({ id }: User){

        // try{

        // }catch(error){
        //     const response: object = {code: "400", message: "Não foi possível completar a exclusão. Atualize a página e tente novamente.", status: 400}
        // }

        admin.auth().deleteUser(id)
        .then(async () => {

            const usersRef = db.collection('users');
            const user = await usersRef.doc(id).delete();

            return {code: "200", message: "Exclusão realizada com sucesso.", status: 200}

        }).catch((error) => {
            const response: object = {code: "400", message: "Não foi possível completar a exclusão. Atualize a página e tente novamente.", status: 400}
            return response
        })

        return id;
        
    }
}

export { DeleteUserService }