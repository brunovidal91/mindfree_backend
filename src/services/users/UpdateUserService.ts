import { db } from "../../data/firebase";

interface User{
    id: string,
    name?: string,
    email?: string
}

class UpdateUserService{
    async handle({id, name, email}: User){

        const usersRef = db.collection('users');
        const user = await usersRef.doc(id).update({
            name,
            email
        });

        return user;

    }
}


export { UpdateUserService }