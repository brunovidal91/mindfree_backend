import { db } from "../../data/firebase";

interface Transaction{
    userId: string,
    date: string;
    datareq: string,
    month: string,
    year: string
}

class GetTransactionsService{
    async handle({userId, date, datareq, month, year}: Transaction){

        datareq = datareq.toUpperCase();

        const transactionsList: object[] = [];
        
        const transactionsRef = db.collection('transactions'+userId);
        let transactions;
        
        if(datareq === 'D'){

            transactions = await transactionsRef.where("date","==", date).get();
        }else if(datareq === 'M'){

            transactions = await transactionsRef.where("month","==", month).get();
        }else{
            transactions = await transactionsRef.where("year","==", year).get();
        }

        transactions.forEach((doc) => {

            let transaction = {
                id: doc.id,
                ...doc.data()
            }

            transactionsList.push(transaction);
        })

        return transactionsList
    }
}


export { GetTransactionsService }