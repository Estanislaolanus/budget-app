import "./GetAmount.css";
import { RefObject, useRef, useState } from 'react';
import { BudgetFormProps } from '../../Types';
import Dropdown from '../Dropdown/Dropdown';
export default function GetAmount({ type, setAddTransaction, handleSetBudget, handleSetExpense, handleSetAmountsArray }: BudgetFormProps) {
  const amountRef: RefObject<HTMLInputElement> = useRef(null);
  const descriptionRef: RefObject<HTMLInputElement> = useRef(null);
  const [category, setCategory] = useState("");
  const alertRef: RefObject<HTMLDivElement> = useRef(null);
  function addAmount(type: string) {
    const amountInput = amountRef.current;
    const descriptionSelect = descriptionRef.current;
    if (type === "expense" && !category) return;
    if (!amountInput || !descriptionSelect) return;
    const amount: number = parseInt(amountInput.value);
    const description: string = descriptionSelect.value;
    const date = new Date();
    if (!amount || amount <= 0) return;
    const newAmount = {
      id: crypto.randomUUID(),
      type,
      amount,
      description,
      category: category || "income",
      timestamp: date
    }

    if (type === "budget") {
      handleSetBudget(amount);
    } else {
      handleSetExpense(amount);
    }
    handleSetAmountsArray(newAmount);
    setAddTransaction(false);
    setCategory("");
    amountInput.value = "";
    descriptionSelect.value = "";

  }
  return (
    <>
      <div className="background-screen"></div>
      <div ref={alertRef} className='get-amount-container'>
        <button onClick={() => setAddTransaction(false)} className='close-btn'>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20L4 4.00003M20 4L4.00002 20" stroke="#000000" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <div className="get-amount-fields">
          {type === "budget" ? <></> : <Dropdown setCategory={setCategory} category={category} />}
          <div className='input-field'>
            <input ref={amountRef} type="number" placeholder='Enter amount' pattern="[0-9]*" />
          </div>
          <div className='input-field'>
            <input ref={descriptionRef} type="text" placeholder='Enter description' />
          </div>
        </div>
        <div className="get-amount-buttons">
          <button onClick={() => addAmount(type)} className='add-amount'>Add Transacion</button>
        </div>
      </div>
    </>
  )
}
