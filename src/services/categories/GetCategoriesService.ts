import { db } from "../../data/firebase";

interface User{
    userId: string
}


class GetCategoriesService{

    async handle({ userId }: User){
        
        try{

            const categoriesRef = db.collection('categories' + userId);
            const categoriesDoc = await categoriesRef.get();
           
            const categories: object[] = [];
    
            categoriesDoc.forEach((doc) => {
                
                let category = {
                    id: doc.id,
                    title: doc.data().title,
                    isMonthly: doc.data().isMonthly,
                    day: doc.data().day
                }
    
                categories.push(category);
    
            })

            const response: object = {categories, status: 200}
    
            return response;
        
        }catch(error){
            const response: object = {code: "400", message: "Não foi possível listar as categorias. Atualize a página.", status: 400}
            return response; 
        }
    }


}

export { GetCategoriesService }