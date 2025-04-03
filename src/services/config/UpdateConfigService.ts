import { db, admin } from '../../data/firebase';

interface Config{
    id: string,
    currentYear: string,
    investmentRate: string,
}

class UpdateConfigService{
    async handle({id, currentYear, investmentRate}: Config){

        if(!currentYear || !investmentRate){
            const response: object = {code: "400", message: "É necessário informar todas as configurações.", status: 400}
            return response;

        }

        const yearFireStore = admin.firestore.Timestamp.now().toDate().getFullYear().toString();


        if(currentYear < "2000" || currentYear > yearFireStore){

            const response: object = {code: "400", message: "O ano vigente não pode ser inferior a 2000 nem superior ao ano atual.", status: 400}
            return response;
        }

        if(investmentRate < '0' || investmentRate > '1'){
            const response: object = {code: "400", message: "A alíquota de investimento deve estar entre 0.00 e 100 por cento.", status: 400}
            return response;
        }

        const userConfig = {
            currentYear,
            investmentRate
        }


        try{
            const configRef = db.collection("config");
            const config = await configRef.doc(id).update(userConfig);

            const response: object = {config, status: 200}

            return response;

        }catch(error){
            const response: object = {code: "400", message: "Não foi possível alterar as configurações. Atualize a página e tente novamente.", status: 400}
            return response; 
        }

    }
}


export { UpdateConfigService }