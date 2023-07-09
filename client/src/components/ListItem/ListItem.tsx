
import { ListItemProps } from '../../Types';
import getCategoryAndColor from '../../utils/getCategoryAndColor'
import "./ListItem.css";
export default function ListItem({amount, deleteAmount}:ListItemProps) {
    const amountColor = amount.type === "budget" ? "green" : "red";
    return (
        <div className='list-item'>
            <div className="bar"></div>
            <div className="list-item-info">
                <div className='list-item-category'>{getCategoryAndColor(amount.category).category}</div>
                <div className='list-item-description'>{amount.description}</div>
            </div>
            <div className="list-item-payment">
                <div className='list-item-amount' style={{color: amountColor}}>{amount.type === "budget" ? "+" : "-"}${amount.amount}</div>
                <div className="list-item-date">{amount.timestamp}</div>
            </div>
            <button onClick={() => deleteAmount(amount.id, amount.type, amount.amount)} className='list-item-delete'><i className='fa-solid fa-trash'></i></button>
        </div>
    )
}
