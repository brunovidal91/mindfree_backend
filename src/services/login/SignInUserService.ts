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

            let userResponse = {...user, message: "Usuário autenticado com sucesso!", status: 200}

            return userResponse;

        }).catch((error) => {
            const { code } = error;
            return {code, message: "Acesso negado, verifique as credenciais.", status: 403};
        })


        return userData;
    }

}


export { SignInUserService }