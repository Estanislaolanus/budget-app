
import { ListItemProps } from '../../Types';
import "./ListItem.css";
export default function ListItem({amount, deleteAmount}:ListItemProps) {
    return (
        <div className='list-item'>
            <div className='list-item-category'>{amount.category}</div>
            <div className='list-item-amount'>${amount.amount}</div>
            <button onClick={() => deleteAmount(amount.id, amount.type, amount.amount)} className='list-item-delete'><img src="./assets/trash.png" /></button>
        </div>
    )
}
