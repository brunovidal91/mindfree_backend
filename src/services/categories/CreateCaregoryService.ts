import { db } from "../../data/firebase";

interface Category{
    userId: string,
    title: string,
    isMonthly: boolean,
    day?: string
}

class CreateCaregoryService{
    async handle({userId, title, isMonthly, day}: Category){
        const categoryRef = db.collection('categories'+userId);
        const id = categoryRef.doc().id;
        const category = await categoryRef.doc(id).create({
            title,
            isMonthly,
            day
        })

        return category;
    }
}


export { CreateCaregoryService }