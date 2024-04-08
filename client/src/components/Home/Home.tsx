import { useEffect, useState } from 'react';
import { Amount } from '../../Types';
import Axios from "../../api/Axios";
import DisplayLists from '../DisplayLists/DisplayLists';
import Slider from '../Slider/Slider';
import useDate from '../../hooks/useDate';


const getSum = (type: string, data: Amount[]) => {
    const nums = data
        .flatMap((a: Amount) => a.type === type && a.amount)
        .filter((a: number | boolean) => typeof a === "number");
    let calculateSum = 0;
    for (const num of nums) {
        if (typeof num === "boolean") continue;
        calculateSum += num
    }
    return calculateSum;
}
function Home() {
    const [amountArray, setAmountArray] = useState<Amount[]>([]);
    const [budget, setBudget] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const date = useDate()?.date;

    useEffect(() => {
        const getAmount = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const month = date?.getMonth() ?? 0;
                const year = date?.getFullYear();
                if (!month && !year) return;
                const res = await Axios.get(`/amount/${month + 1}/ ${year}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                });

                if (!res) return setLoading(false);
                const data = res.data;
                if (!data) return setLoading(false);
                const getAmountArray = data.amountArray ?? [];
                setBudget(getSum("budget", getAmountArray));
                setExpense(getSum("expense", getAmountArray));
                setAmountArray(getAmountArray);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getAmount();
    }, [date]);
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
    function compareDate(date: Date): boolean {
        const comparisonDate: Date = new Date();
        return date.getMonth() === comparisonDate.getMonth() && date.getFullYear() === comparisonDate.getFullYear();
    }
    function handleSetBudget(newBudget: number, date: Date) {
        if (date) return compareDate(date);
        setBudget(prev => prev + newBudget);
    }
    function handleSetExpense(newExpense: number, date: Date) {
        if (date) return compareDate(date);
        setExpense(prev => prev + newExpense);
    }
    function handleSetBudgetArray(newAmount: Amount) {
        if (compareDate(newAmount.timestamp)) setAmountArray(prev => [...prev, newAmount]);
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
    if (loading) return <div className='loader'></div>
    return (
        <>
            <Slider budget={budget} expense={expense} amountArray={amountArray} />
            <DisplayLists
                amountArray={amountArray}
                deleteAmount={deleteAmount}
                setAmountArray={setAmountArray}
                setBudget={setBudget}
                setExpense={setExpense}
                handleSetBudget={handleSetBudget}
                handleSetExpense={handleSetExpense}
                handleSetAmountsArray={handleSetBudgetArray}
            />
        </>
    );
}

export default Home;