import { db } from "../../data/firebase";

interface User{
    userId: string
}


class GetCategoriesService{

    async handle({ userId }: User){
        
        const categoriesRef = db.collection('categories' + userId);
        const categoriesDoc = await categoriesRef.get();
       
        const categories: object[] = [];

        categoriesDoc.forEach((doc) => {
            
            let category = {
                id: doc.id,
                title: doc.data().title
            }

            categories.push(category);

        })

        return categories;
    
    }

}

export { GetCategoriesService }