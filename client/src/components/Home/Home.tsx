import { useEffect, useState } from 'react';
import { Amount } from '../../Types';
import DisplayBudget from '../DisplayBudget/DisplayBudget';
import GetAmount from '../GetAmount/GetAmount';
import DisplayLists from '../DisplayLists/DisplayLists';

const getData = () => {
    const getData = localStorage.getItem("amountArray");
    return getData ? JSON.parse(getData) : [];
}
const getNum = (type: string) => {
    const getData = localStorage.getItem("amountArray");

    const data = getData ? JSON.parse(getData) : [];
    const num = data.map((a: Amount) => a.type === type && a.amount).reduce(
        (accumulator: number, currentValue: number) => accumulator + currentValue,
        0
    );
    return num;
}
function Home() {
    const [amountArray, setAmountArray] = useState<Amount[]>(getData);
    const [budget, setBudget] = useState<number>(getNum("budget"));
    const [expense, setExpense] = useState<number>(getNum("expense"));
    useEffect(() => {
        localStorage.setItem("amountArray", JSON.stringify(amountArray));
    }, [amountArray])
    function handleSetBudget(newBudget: number) {
        setBudget(prev => prev + newBudget);
    }
    function handleSetExpense(newExpense: number) {
        setExpense(prev => prev + newExpense);
    }
    function handleSetBudgetArray(newAmount: Amount) {
        setAmountArray(prev => [...prev, newAmount]);
    }
    function deleteAmount(id: string, type: string, amount: number) {
        setAmountArray(prev => {
            const newArray = prev.filter(a => a.id !== id);
            return newArray;
        });
        if (type === "budget") {
            setBudget(prev => prev - amount);
        } else {
            setExpense(prev => prev - amount);
        }
    }
    return (
        <>
            <DisplayBudget budget={budget} expense={expense} amountArray={amountArray} />
            <GetAmount
                handleSetBudget={handleSetBudget}
                handleSetExpense={handleSetExpense}
                handleSetAmountsArray={handleSetBudgetArray}
            />
            <DisplayLists
                amountArray={amountArray}
                deleteAmount={deleteAmount}
            />
        </>
    );
}

export default Home;

