import React, { RefObject, useRef } from 'react'
import "./getAmount.css";
import { BudgetFormProps } from '../../constants';
export default function BudgetForm({handleSetBudget, handleSetExpense}: BudgetFormProps) {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  function addAmount(type: string) {
    const input = inputRef.current;
    if(!input) return;
    const amount:number = parseInt(input.value);
    if(!amount || amount <= 0) return;
    const newAmount = {
      type: "",
      amount
    } 
    if(type === "budget") {
      newAmount.type = "budget"
      handleSetBudget(amount);
    } else {
      newAmount.type = "expense"
      handleSetExpense(amount);
    }
    input.value = "";
  }
  return (
    <>
      <div className='get-amount-container'>
        <div className="get-amount-inputs">
          <input ref={inputRef} type="number"  placeholder='Enter amount' pattern="[0-9]*"/>
          <input type="text"  placeholder='Enter category'/>
        </div>
        <div className="get-amount-buttons">
          <button onClick={() => addAmount("budget")} className='add-amount budget'>Add Budget</button>
          <button onClick={() => addAmount("expense")} className='add-amount expense'>Add Expense</button>
        </div>
      </div>
    </>
  )
}
