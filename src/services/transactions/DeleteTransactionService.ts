import { db } from "../../data/firebase";

interface Transaction{
    userId: string,
    id: string
}

class DeleteTransactionService{

    async handle({userId, id}: Transaction){
        const transactionsRef = db.collection('transactions'+userId);
        const transaction = await transactionsRef.doc(id).delete();

        return id;
    }

}

export { DeleteTransactionService }