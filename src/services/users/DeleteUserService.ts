import { db, admin } from "../../data/firebase";

interface User {
    id: string
}

class DeleteUserService{

    async handle({ id }: User){

        
        admin.auth().deleteUser(id)
        .then(async () => {

            const usersRef = db.collection('users');
            const user = await usersRef.doc(id).delete();

        }).catch((error) => {
            const {code, message} = error;
            return {code: code, message: message}
        })

        return id;
        
    }
}

export { DeleteUserService }