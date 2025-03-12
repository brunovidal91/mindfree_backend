import { db } from "../../data/firebase";

class GetUsersService{
    async handle(){
        
        const users: object[] = [];

        const usersRef = db.collection('users');
        const usersDoc = await usersRef.get();
        usersDoc.forEach((doc) => {
            
            let user = {
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                createdAt: doc.data().createdAt,
                admin: doc.data().admin
            }
            
        
            users.push(user)
        })

        return users;

    }
}

export { GetUsersService }