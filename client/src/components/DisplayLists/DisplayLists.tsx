import "./DisplayLists.css";
import { DisplayListsProps } from '../../Types';
import ListItem from "../ListItem/ListItem";
export default function DisplayLists({amountArray, deleteAmount}:DisplayListsProps) {

    return (
        <div className="lists">
            <div className="budget-list list">
                <div className="lists-title">Budget List</div>
                <div className="list-body">
                    {
                        amountArray.filter(a => a.type === 'budget').map(amount => <ListItem key={amount.id} amount={amount} deleteAmount={deleteAmount}/>)
                    }
                </div>
            </div>
            <div className="expense-list list">
                <div className="lists-title">Expense List</div>
                <div className="list-body">
                    {
                        amountArray.filter(a => a.type === 'expense').map(amount => <ListItem key={amount.id} amount={amount} deleteAmount={deleteAmount}/>)
                    }
                </div>
            </div>
        </div>
    )
}
