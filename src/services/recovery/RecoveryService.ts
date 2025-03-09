import { auth, sendPasswordResetEmail } from "../../data/authfirebase";

interface User{
    email: string
}

class RecoveryService{
    async handle({email}: User){
        if(!email){
            return {message: "é necessário informar um email"}
        }

       const sendEmail = sendPasswordResetEmail(auth, email)
        .then(() => {

            return "Email enviado, verifique sua caixa de entrada."
            
        })
        .catch((error) => {
            const {code, message} = error;
            return {code, message}
        })

        return sendEmail
    }
}

export { RecoveryService }