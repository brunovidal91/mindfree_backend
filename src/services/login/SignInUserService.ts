import { db } from '../../data/firebase';
import { auth } from '../../data/authfirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface User{
    email: string,
    password: string
}

class SignInUserService{

    async handle({ email, password }: User ){
        

        // const auth = getAuth();
        const userData = signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {


            const usersRef = db.collection('users');
            const dados = ((await usersRef.doc(userCredential.user.uid).get()))
            
            const token = await auth.currentUser?.getIdToken();
            
            const user = {
                id: userCredential.user.uid,
                token,
                ...dados.data()
                
            }

            
            return user;

        }).catch((error) => {
            const {code, message} = error;
            return {code, message};
        })


        return userData;
    }

}

export { SignInUserService }