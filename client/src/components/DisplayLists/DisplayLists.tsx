import "./DisplayLists.css";
import { Amount, DisplayListsProps } from '../../Types';
import ListItem from "../ListItem/ListItem";
import Axios from "../../api/Axios";
export default function DisplayLists({ amountArray, deleteAmount, setAmountArray }: DisplayListsProps) {
    async function updateAmountArray(id: string, object: Amount | Object) {
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
        try {
            const accessToken = localStorage.getItem("accessToken");
            await Axios.put(`/amount/${id}` , object, {
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
                        amountArray.filter(a => a.type === 'budget').map(amount => <ListItem key={amount.id} amount={amount} deleteAmount={deleteAmount} updateAmountArray={updateAmountArray} />)
                    }
                </div>
            </div>
            <div className="expense-list list">
                <div className="lists-title">Expense List</div>
                <div className="list-body">
                    {
                        amountArray.filter(a => a.type === 'expense').map(amount => <ListItem key={amount.id} amount={amount} deleteAmount={deleteAmount} updateAmountArray={updateAmountArray} />)
                    }
                </div>
            </div>
        </div>
    )
}
