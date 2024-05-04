import { useEffect, useState } from 'react';
import { Expense, Income, TypeOfTransaction } from '../../Types';
import Axios from "../../api/Axios";
import DisplayLists from '../DisplayLists/DisplayLists';
import Slider from '../Slider/Slider';
import useDate from '../../hooks/useDate';

function Home() {
    const [expenseArray, setExpenseArray] = useState<Expense[]>([]);
    const [incomeArray, setIncomeArray] = useState<Income[]>([]);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const date = useDate()?.date;

    useEffect(() => {
        const setEveryStateToDefault = () => {
            setTotalIncome(0);
            setTotalExpense(0);
            setExpenseArray([]);
            setIncomeArray([]);
            setLoading(false);
        }
        const setExpensesToDefault = () => {
            setTotalExpense(0);
            setExpenseArray([]);
        }
        const setIncomesToDefault = () => {
            setIncomeArray([]);
            setTotalIncome(0);
        }
        const getData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const month = date?.getMonth() ?? 0;
                const year = date?.getFullYear();
                if (!month && !year) return;
                const resIncome = await Axios.get(`/income/${month + 1}/${year}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                const resExpense = await Axios.get(`/expense/${month + 1}/${year}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                if (!resIncome && !resExpense) return setEveryStateToDefault();
                if (!resIncome) setExpensesToDefault();
                if (!resExpense) setIncomesToDefault();
                const expenseData: Expense[] = resExpense.data;
                const incomeData: Income[] = resIncome.data;
                if (!expenseData && !incomeData) return setEveryStateToDefault();
                if (!expenseData) {
                    return setExpensesToDefault()
                } else {
                    const calculateTotalExpense = expenseData.reduce((acc, curr) => {
                        return acc + curr.amount;
                    }, 0);
                    setTotalExpense(calculateTotalExpense);
                    setExpenseArray(expenseData);
                };
                if (!incomeData) {
                    return setIncomesToDefault()
                } else {
                    const calculateTotalIncome = incomeData.reduce((acc, curr) => {
                        return acc + curr.amount;
                    }, 0);
                    setTotalIncome(calculateTotalIncome);
                    setIncomeArray(incomeData);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [date]);
    async function postIncome(income: Income) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await Axios.post("/income", income, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                withCredentials: true
            });
            const data = await res.data;
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    async function postExpense(expense: Expense) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await Axios.post("/expense", expense, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                withCredentials: true
            });
            const data = await res.data;
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    async function updateTransactionArray(id: string, object: Object, typeOfTransaction: TypeOfTransaction, money?: number,) {
        console.log(object, money, typeOfTransaction)
        if (typeOfTransaction === "expense") {
            const expenseIdx = expenseArray.findIndex(e => e.id === id);
            const expense = expenseArray[expenseIdx];
            Object.entries(object).forEach(([key, value]) => {
                if (key && expense && object.hasOwnProperty(key)) {
                    (expense as any)[key] = value;
                }
            });
            expenseArray[expenseIdx] = expense;
            setExpenseArray([...expenseArray]);
            if (typeof money === "number") setTotalExpense(prev => prev + money);
        } else {
            const incomeIdx = incomeArray.findIndex(i => i.id === id);
            const income = incomeArray[incomeIdx];
            Object.entries(object).forEach(([key, value]) => {
                if (key && income && object.hasOwnProperty(key)) {
                    (income as any)[key] = value;
                }
            });
            incomeArray[incomeIdx] = income;
            setIncomeArray([...incomeArray]);
            if (typeof money === "number") setTotalIncome(prev => prev + money);
        }
        try {
            const accessToken = localStorage.getItem("accessToken");
            await Axios.put(`/${typeOfTransaction}/${id}`, object, {
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
    async function deleteFromDB(id: string, typeOfTransaction: TypeOfTransaction) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            await Axios.delete(`/${typeOfTransaction}/${id}`, {
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

    function deleteTransaction(id: string, typeOfTransaction: TypeOfTransaction, amount: number) {

        if (typeOfTransaction === "expense") {
            setTotalExpense(prev => prev - amount);
            const newExpenseArray = expenseArray.filter(e => e.id !== id);
            setExpenseArray(() => [...newExpenseArray]);
        } else {
            setTotalIncome(prev => prev - amount);
            const newIncomeArray = incomeArray.filter(i => i.id !== id);
            setIncomeArray(() => [...newIncomeArray]);
        }
        deleteFromDB(id, typeOfTransaction);
    }
    if (loading) return <div className='loader'></div>
    return (
        <>
            <Slider totalIncome={totalIncome} totalExpense={totalExpense} expenseArray={expenseArray} incomeArray={incomeArray} />
            <DisplayLists
                incomeArray={incomeArray}
                expenseArray={expenseArray}
                deleteTransaction={deleteTransaction}
                setTotalIncome={setTotalIncome}
                setTotalExpense={setTotalExpense}
                setExpenseArray={setExpenseArray}
                setIncomeArray={setIncomeArray}
                postExpense={postExpense}
                postIncome={postIncome}
                updateTransactionArray={updateTransactionArray}
            />
        </>
    );
}

export default Home;