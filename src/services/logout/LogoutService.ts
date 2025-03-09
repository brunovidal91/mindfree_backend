import { auth } from "../../data/authfirebase"

class LogoutService{
    async handle(){
        
    
        auth.signOut()
        .then(() => {


            return {message: "logout successful"};
            
        }).catch((error) =>console.log(error));

        
    }
}


export { LogoutService }