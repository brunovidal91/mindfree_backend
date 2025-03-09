import { db } from "../../data/firebase";

interface Category {
    id: string,
    userId: string
}

class DeleteCategoryService{

    async handle({id, userId}: Category){

        const categoriesRef = db.collection('categories'+userId);
        const category = await categoriesRef.doc(id).delete();



        return id;
    }
}

export { DeleteCategoryService }