import { db, admin } from "../../data/firebase";

interface Transaction{
    title: string,
    category: {
        id: string,
        title?: string
    },
    value: string,
    userId: string
}

class CreateTransactionServices{
    async handle({title, category, value, userId}: Transaction){


        const categorie = (await db.collection('categories'+userId).doc(category.id).get()).data();

        if(!categorie){
            return {message: "categoria não encontrada"};
        }

        category.title = categorie.title;

        const transactionsRef = db.collection('transactions'+userId);
        const id = transactionsRef.doc().id;
        //const date = new Date().toLocaleDateString();

        const dateFireStore = admin.firestore.Timestamp.now().toDate().toLocaleDateString();
        const monthFireStore = (admin.firestore.Timestamp.now().toDate().getMonth() + 1).toString();
        const yearFireStore = admin.firestore.Timestamp.now().toDate().getFullYear().toString();


        const transaction = await transactionsRef.doc(id).create({
            title,
            value,
            category,
            date: dateFireStore,
            month: monthFireStore,
            year: yearFireStore
        });

        return transaction;
    }
}

export { CreateTransactionServices }