import { ChangeEvent, useEffect, useState, useRef, RefObject } from 'react'
import { ListItemProps } from '../../Types';
import getCategoryAndColor from '../../utils/getCategoryInfo'
import "./ListItem.css";
export default function ListItem({ amount, deleteAmount, updateAmountArray }: ListItemProps) {
    const [edit, setEdit] = useState<Boolean>(false);
    const [editCategory, setEditCategory] = useState<String>(amount.category);
    const [editAmount, setEditAmount] = useState<number>(amount.amount);
    const [editDescription, setEditDescription] = useState<String>(amount.description);
    const [showFullDescription, setShowFullDescription] = useState<Boolean>(false);
    const background = amount.type === "budget" ? "#374785" : "#f76c6c"
    const amountColor = amount.type === "budget" ? "green" : "red";
    const itemRef: RefObject<HTMLDivElement> = useRef(null);
    const textareaRef: RefObject<HTMLTextAreaElement> = useRef(null);
    const format = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short"
    });
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        const height = textarea.scrollHeight;
        textarea.style.height = `${height}px`;
    }, []);
    function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value)
        if (typeof value !== "number") return;
        setEditAmount(() => value)
    }
    function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value
        if (typeof value !== "string") return;
        setEditDescription(() => value);
    }
    function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        setEditCategory(() => value);
    }
    function confirmEdition() {
        let object: Object = {};
        if (editAmount !== amount.amount && editAmount) object = { ...object, amount: editAmount };
        if (editDescription !== amount.description && editDescription !== "") object = { ...object, description: editDescription };
        if (editCategory !== amount.category) object = { ...object, category: editCategory };
        if (Object.keys(object).length === 0) return setEdit(() => !edit);
        if (editAmount !== amount.amount && editAmount) {
            const money = editAmount - amount.amount;
            updateAmountArray(amount.id, object, money, amount.type)
        } else {
            updateAmountArray(amount.id, object);
        }
        setEdit(() => !edit);
    }

    return (
        <div className='list-item'>
            <div style={{ background: background }} className="bar"></div>
            <div ref={itemRef} className="list-item-info">
                <div className='list-item-category'>

                    {edit && amount.type === "expense" ?
                        <div className="dropdown-item">
                            <select onChange={e => handleCategory(e)} value={editCategory.toString()}>
                                <option value="income">Income</option>
                                <option value="groceries">Groceries</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="taxes">Taxes</option>
                                <option value="education">Education</option>
                                <option value="personalCare">Personal Care</option>
                                <option value="transportation">Transportation</option>
                                <option value="insurance">Insurance</option>
                                <option value="debtPayents">Debt Payents</option>
                                <option value="other">Other</option>
                            </select>
                            <div className="caret-item">
                                <i className='fa-solid fa-caret-down'></i>
                            </div>
                        </div>
                        :
                        <div>{getCategoryAndColor(amount.category).category}</div>
                    }
                </div>
                <div className='list-item-description'>
                    {edit ?
                        <textarea ref={textareaRef} className=' list-item-textarea' onChange={e => handleDescriptionChange(e)}>{amount.description}</textarea>
                        :
                        <div onClick={() => {
                            if (amount.description.length > 32) setShowFullDescription(!showFullDescription);
                        }}>{
                                amount.description.length > 32 ?
                                    amount.description.slice(0, 32) + "..." :
                                    amount.description
                            }</div>
                    }
                    {
                        showFullDescription ?
                            <div onClick={() => setShowFullDescription(!showFullDescription)} className='list-item-full-description'>
                                <div className='fullist-item-full-description-title'>Description</div>
                                <div className='fullist-item-full-description-text'>{amount.description}</div>
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
            <div className="list-item-data">
                <div className='list-item-amount' style={{ color: amountColor }}>{amount.type === "budget" ? "+" : "-"}$
                    {edit ?
                        <input
                            onChange={e => handleAmountChange(e)}
                            className='list-item-input'
                            type="number"
                            value={amount.amount}
                        />
                        :
                        <div>{amount.amount}</div>}
                </div>
                <div className="list-item-date">{format.format(new Date(amount.timestamp))}</div>

            </div>

            <div className="list-btns">
                <div className='list-item-edit'>
                    {
                        edit ?
                            <>
                                <button onClick={() => confirmEdition()}><i className="fa-solid fa-check"></i></button>
                                <button onClick={() => setEdit(() => !edit)}><i className='fa-solid fa-x'></i></button>
                            </> :
                            <button onClick={() => setEdit(() => !edit)}><img src="./assets/icons/edit.png" alt="" /></button>
                    }

                </div>
                <button onClick={() => deleteAmount(amount.id, amount.type, amount.amount)}><img src="./assets/icons/trash.png" alt="" /></button>

            </div>
        </div>
    )
}

