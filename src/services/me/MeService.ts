import { db } from "../../data/firebase";

interface User{
    id: string
}

class MeService{
    async handle({id}: User){
        const usersRef = db.collection('users')
        const doc = await usersRef.doc(id).get();

        try{

            let me = {
                id: doc.id,
                name: doc.data()?.name,
                email: doc.data()?.email,
                createdAt: doc.data()?.createdAt 
            }
            
            return me;

        }catch(error){
          
            return {error}
        }

    }
}

export { MeService }