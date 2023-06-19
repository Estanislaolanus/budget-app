import { RefObject, useRef } from 'react'
import "./GetAmount.css";
import { BudgetFormProps } from '../../constants';
export default function GetAmount({handleSetBudget, handleSetExpense, handleSetAmountsArray}: BudgetFormProps) {
  const amountRef: RefObject<HTMLInputElement> = useRef(null);
  const categoryRef: RefObject<HTMLInputElement> = useRef(null);


  function addAmount(type: string) {
    const amountInput = amountRef.current;
    const categoryInput = categoryRef.current
    if(!amountInput || !categoryInput) return;
    const amount:number = parseInt(amountInput.value);
    const category:string = categoryInput.value;
    if(!amount || amount <= 0 || !category) return;
    const newAmount = {
      id: crypto.randomUUID(),
      type,
      amount,
      category,
      timestamp: Date.now()
    } 
    handleSetAmountsArray(newAmount);
    
    if(type === "budget") {
      handleSetBudget(amount);
    } else {
      handleSetExpense(amount);
    }
    amountInput.value = "";
    categoryInput.value = "";
  }
  return (
    <>
      <div className='get-amount-container'>
        <div className="get-amount-inputs">
          <input ref={categoryRef} type="text"  placeholder='Enter category'/>
          <input ref={amountRef} type="number"  placeholder='Enter amount' pattern="[0-9]*"/>
        </div>
        <div className="get-amount-buttons">
          <button onClick={() => addAmount("budget")} className='add-amount budget'>Add Budget</button>
          <button onClick={() => addAmount("expense")} className='add-amount expense'>Add Expense</button>
        </div>
      </div>
    </>
  )
}
