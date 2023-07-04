import { useEffect, useState } from 'react';
import { Amount } from '../../Types';
import Axios from "../../api/Axios";
import GetAmount from '../GetAmount/GetAmount';
import DisplayLists from '../DisplayLists/DisplayLists';
import Slider from '../Slider/Slider';


const getSum = (type: string, data: Amount[]) => {
    const nums = data
    .flatMap((a: Amount) => a.type === type && a.amount)
    .filter((a: number | Boolean) =>typeof a === "number");
    let calculateSum = 0;
    for (const num of nums) {
        if(typeof num === "boolean") continue;
        calculateSum += num
    }
    return calculateSum;
}
function Home() {
    const [amountArray, setAmountArray] = useState<Amount[]>([]);
    const [budget, setBudget] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [loading, setLoading] = useState<Boolean>(true);
    useEffect(() => {
        const getAmount = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const amount = await Axios.get("/amount", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }});
                    const { amountArray } = amount.data;
                    if (!amount.data || !amountArray) return setLoading(false);
                    setBudget(getSum("budget", amountArray));
                    setExpense(getSum("expense", amountArray));
                    setAmountArray(amountArray);
                    setLoading(false);
            } catch (err) {
                
            }
        }
        getAmount()
    }, [])
    async function postAmount(newAmount: Amount) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            await Axios.post("/amount", newAmount, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                withCredentials: true
            });
        } catch (err) {
            console.log(err);
        }
    }
    async function deleteFromDB(id: string) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            await Axios.delete(`/amount/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                withCredentials: true
            });
        } catch (err) {
            console.log(err);
        }
    }
    function handleSetBudget(newBudget: number) {
        setBudget(prev => prev + newBudget);
    }
    function handleSetExpense(newExpense: number) {
        setExpense(prev => prev + newExpense);
    }
    function handleSetBudgetArray(newAmount: Amount) {
        setAmountArray(prev => [...prev, newAmount]);
        postAmount(newAmount);
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
        deleteFromDB(id);
    }
    if(loading) return <div className='loader'></div>
    return (
        <>

            <Slider budget={budget} expense={expense} amountArray={amountArray} />
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

