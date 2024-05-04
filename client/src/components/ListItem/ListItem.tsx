import { ChangeEvent, useEffect, useState, useRef, RefObject } from 'react'
import { Expense, ListItemProps } from '../../Types';
import "./ListItem.css";
export default function ListItem({ transaction, typeOfTransaction, deleteTransaction, updateTransactionArray }: Readonly<ListItemProps>) {
    const category = "category" in transaction ? (transaction as Expense).category : "";
    const [edit, setEdit] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<string>(category);
    const [editAmount, setEditAmount] = useState<number>(transaction.amount);
    const [editDescription, setEditDescription] = useState<string>(transaction.description);
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
    const [numberValue, setNumberValue] = useState<number>(transaction.amount);
    const background = typeOfTransaction === "income" ? "#374785" : "#f76c6c"
    const amountColor = typeOfTransaction === "income" ? "green" : "red";
    const listRef: RefObject<HTMLDivElement> = useRef(null);
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
    useEffect(() => {
        if (!edit) return;
        const handler = (e: MouseEvent) => {
            if (!listRef.current || !e.target) return;
            if (!listRef.current.contains(e.target as Node)) setEdit(false);
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    });
    function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value)
        if (typeof value !== "number") return;
        setNumberValue(() => value);
        setEditAmount(() => value);
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
    function editList() {
        setShowFullDescription(false);
        setNumberValue(transaction.amount)
        setEdit(() => !edit);
    }
    function confirmEdition() {
        let object: Object = {};
        if (editAmount !== transaction.amount && editAmount) object = { ...object, amount: editAmount };
        if (editDescription !== transaction.description && editDescription !== "") object = { ...object, description: editDescription };
        if (editCategory !== category) object = { ...object, category: editCategory };
        if (Object.keys(object).length === 0) return setEdit(() => !edit);
        if (editAmount !== transaction.amount && editAmount) {
            const money = editAmount - transaction.amount;
            updateTransactionArray(transaction.id, object, typeOfTransaction, money);
        } else {
            updateTransactionArray(transaction.id, object, typeOfTransaction);
        }
        setEdit(() => !edit);
    }

    return (
        <div ref={listRef} className='list-item'>
            <div style={{ background: background }} className="bar"></div>
            <div ref={itemRef} className="list-item-info">
                <div className='list-item-category'>

                    {edit && typeOfTransaction === "expense" ?
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
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                                    <g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z" /> </g>

                                </svg>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
                <div className='list-item-description'>
                    {
                        showFullDescription ?
                            <button onClick={() => setShowFullDescription(!showFullDescription)} className='list-item-full-description'>
                                <div className='fullist-item-full-description-title'>Description</div>
                                <div className='fullist-item-full-description-text'>{transaction.description}</div>
                            </button>
                            :
                            <></>
                    }
                    {edit ?
                        <textarea ref={textareaRef} className=' list-item-textarea' onChange={e => handleDescriptionChange(e)}>{transaction.description}</textarea>
                        :
                        <button onClick={() => {
                            if (transaction.description.length > 32) setShowFullDescription(!showFullDescription);
                        }}>{
                                transaction.description.length > 32 ?
                                    transaction.description.slice(0, 32) + "..." :
                                    transaction.description
                            }</button>
                    }

                </div>
            </div>
            <div className="list-item-data">
                <div className='list-item-amount' style={{ color: amountColor }}>{typeOfTransaction === "income" ? "+" : "-"}$
                    {edit ?
                        <input
                            onChange={e => handleAmountChange(e)}
                            className='list-item-input'
                            type="number"
                            value={numberValue}
                        />
                        :
                        <div>{transaction.amount}</div>}
                </div>
                <div className="list-item-date">{format.format(new Date(transaction.timestamp))}</div>

            </div>

            <div className="list-btns">
                <div className='list-item-edit'>
                    {
                        edit ?
                            <>
                                <button onClick={() => confirmEdition()}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                                <button onClick={() => setEdit(() => !edit)}>
                                    <svg width="64px" height="64px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.8640000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="cancel"> <path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z"></path> <path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z"></path> </g> </g></svg>
                                </button>
                            </> :
                            <button onClick={() => editList()}><img src="./assets/icons/edit.png" alt="" /></button>
                    }

                </div>
                <button onClick={() => deleteTransaction(transaction.id, typeOfTransaction, transaction.amount)}><img src="./assets/icons/trash.png" alt="" /></button>

            </div>
        </div>
    )
}

