import { db } from '../../data/firebase';

interface Config{
    id: string
}

class GetConfigService{
    async handle( {id} : Config){

        if(!id){
            return;
        }

        try{

            const configRef = db.collection("config");
            const configReq = await configRef.doc(id).get();

     

            const config = {
                currentYear: configReq.data()?.currentYear,
                investmentRate: configReq.data()?.investmentRate
            }

            const response: object = {status: 200, config}

    
            return response

        }catch(error){
            const response: object = {code:"400", message: "Não foi possível obter as configurações de usuário. Atualize a página e tente novamente.", status: 400, config: {}};
            return response
        }

    }
}

export { GetConfigService }