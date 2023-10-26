import "./DisplayLists.css";
import { Amount, DisplayListsProps } from '../../Types';
import Axios from "../../api/Axios";
import DisplayListSection from "../DisplayListSection/DisplayListSection";
export default function DisplayLists({ amountArray, deleteAmount, setAmountArray, setBudget, setExpense }: DisplayListsProps) {
    const budgetArray:Amount[] = amountArray.filter(a => a.type === 'budget');
    const expenseArray:Amount[] = amountArray.filter(a => a.type === 'expense');
    async function updateAmountArray(id: string, object: Amount | Object, money?:number, type?: string) {
        const idx = amountArray.findIndex(a => a.id === id);
        if (idx === -1) return;
        let amount = {...amountArray[idx]};
        Object.entries(object).forEach(([key, value]) => {
            if (key && amount && object.hasOwnProperty(key)) {
                (amount as any)[key] = value;
            }
        });
        setAmountArray(prev => {
            prev.splice(idx, 1, amount);
            return prev;
        });
        if(type === "budget") {
            
            if(typeof money === "number") setBudget(prev => {
                const newAmount = prev + money
                return newAmount;
            });
        } else {
            if(typeof money === "number") setExpense(prev => {
                const newAmount = prev + money
                return newAmount;
            });
        }
        try {
            const accessToken = localStorage.getItem("accessToken");
            await Axios.put(`/amount/${id}`, object, {
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
    return (
        <div className="lists">
            <div className="budget-list list">
                <div className="lists-title">Budget List</div>
                <div className="list-body">
                    {
                        <DisplayListSection key="budget" amountArray={budgetArray} updateAmountArray={updateAmountArray} deleteAmount={deleteAmount}/>
                    }
                </div>
            </div>
            <div className="expense-list list">
                <div className="lists-title">Expense List</div>
                <div className="list-body">
                    {
                        <DisplayListSection key="expense" amountArray={expenseArray} updateAmountArray={updateAmountArray} deleteAmount={deleteAmount}/>
                    }
                </div>
            </div>
        </div>
    )
}
