import { RefObject, useRef, useState } from 'react';
import "./GetAmount.css";
import { BudgetFormProps } from '../../Types';
import Dropdown from '../Dropdown/Dropdown';
export default function GetAmount({ handleSetBudget, handleSetExpense, handleSetAmountsArray }: BudgetFormProps) {
  const amountRef: RefObject<HTMLInputElement> = useRef(null);
  const descriptionRef: RefObject<HTMLInputElement> = useRef(null);
  const [category, setCategory] = useState("");
  // const categoryRef: RefObject<HTMLSelectElement> = useRef(null);

  function addAmount(type: string) {
    const amountInput = amountRef.current;
    const descriptionSelect = descriptionRef.current
    if (!amountInput || !category || !descriptionSelect) return;
    const amount: number = parseInt(amountInput.value);
    const description: string = descriptionSelect.value;
    const date = new Date();
    if (!amount || amount <= 0) return;
    const newAmount = {
      id: crypto.randomUUID(),
      type,
      amount,
      description,
      category,
      timestamp: date
    }
    
    if (type === "budget") {
      if(category !== "income") return;
      handleSetBudget(amount);
    } else {
      if(category === "income") return;
      handleSetExpense(amount);
    }
    handleSetAmountsArray(newAmount);
    setCategory("");
    amountInput.value = "";
    descriptionSelect.value = "";

  }
  return (
    <>
      <div className='get-amount-container'>
        <div className="get-amount-fields">
          <Dropdown setCategory={setCategory} category={category}/>
          <div className='input-field'>
            <input ref={amountRef} type="number" placeholder='Enter amount' pattern="[0-9]*" />
          </div>
          <div className='input-field'>
            <input ref={descriptionRef} type="text" placeholder='Enter description' />
          </div>
        </div>
        <div className="get-amount-buttons">
          <button onClick={() => addAmount("budget")} className='add-amount budget'>Add Budget</button>
          <button onClick={() => addAmount("expense")} className='add-amount expense'>Add Expense</button>
        </div>
      </div>
    </>
  )
}
