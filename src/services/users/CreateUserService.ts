import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { db, admin } from "../../data/firebase";


interface User {
    name: string,
    email: string,
    password: string,
}

class CreateUserService{

    async handle({ name, email, password }: User){

         

        let userCreated = admin.auth().createUser({
            email: email,
            password: password,
            emailVerified: false,
            disabled: false
        }).then(async (userRecord) => {

            const usersRef = db.collection('users');
            const user = {
                name,
                email,
                createdAt: new Date().toLocaleDateString()
            }
    
            const createdUser = await usersRef.doc(userRecord.uid).set(user);       

            return createdUser;

        }).catch((error) => {

            const {code, message} = error;
            return {code: code, message: message}
        })
    
    
        return userCreated;
        
    }
}

export { CreateUserService }