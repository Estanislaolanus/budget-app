import "./DisplayLists.css";
import { DisplayListsProps } from '../../constants'
import ListItem from "../ListItem/ListItem";
export default function DisplayLists({budgetArray, expenseArray, deleteAmount}:DisplayListsProps) {
    
    return (
        <div className="lists">
            <div className="budget-list list">
                <div className="lists-title">Budget List</div>
                <div className="list-body">
                    {
                        budgetArray.map(amount => <ListItem key={amount.id} amount={amount} deleteAmount={deleteAmount}/>)
                    }
                </div>
            </div>
            <div className="expense-list list">
                <div className="lists-title">Expense List</div>
                <div className="list-body">
                    {
                        expenseArray.map(amount => <ListItem key={amount.id} amount={amount} deleteAmount={deleteAmount}/>)
                    }
                </div>
            </div>
        </div>
    )
}
