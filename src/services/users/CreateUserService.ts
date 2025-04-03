import { db, admin } from "../../data/firebase";


interface User {
    name: string,
    email: string,
    password: string,
}

class CreateUserService{

    async handle({ name, email, password }: User){

         let userID: string;

        let userCreated = admin.auth().createUser({
            email: email,
            password: password,
            emailVerified: false,
            disabled: false
        }).then(async (userRecord) => {

            userID = userRecord.uid;

            const usersRef = db.collection('users');
            const user = {
                name,
                email,
                createdAt: new Date().toLocaleDateString(),
                admin: false
            }
    
            const createdUser = await usersRef.doc(userRecord.uid).set(user);       

            return createdUser;

        }).then(async () => {

            const userConfig = {
                currentYear: admin.firestore.Timestamp.now().toDate().getFullYear().toString(),
                investmentRate: "0.20"
            }
    
            const configRef = db.collection("config");
            const config = await configRef.doc(userID).create(userConfig);

            const response: object = {config, status: 200}

            return response;
        })
        
        
        .catch((error) => {

            const {code, message} = error;
            return {code: code, message: message}
        })
    
    
        return userCreated;
        
    }
}

export { CreateUserService }