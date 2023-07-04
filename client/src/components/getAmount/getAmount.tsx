import { RefObject, useRef } from 'react'
import "./GetAmount.css";
import { BudgetFormProps } from '../../Types';
export default function GetAmount({ handleSetBudget, handleSetExpense, handleSetAmountsArray }: BudgetFormProps) {
  const amountRef: RefObject<HTMLInputElement> = useRef(null);
  const descriptionRef: RefObject<HTMLInputElement> = useRef(null);
  const categoryRef: RefObject<HTMLSelectElement> = useRef(null);


  function addAmount(type: string) {
    const amountInput = amountRef.current;
    const categoryInput = categoryRef.current;
    const descriptionSelect = descriptionRef.current
    if (!amountInput || !categoryInput || !descriptionSelect) return;
    const amount: number = parseInt(amountInput.value);
    const description: string = descriptionSelect.value;
    const category: string = categoryInput.value;
    const date = new Date();
    if (!amount || amount <= 0 || !category) return;
    const newAmount = {
      id: crypto.randomUUID(),
      type,
      amount,
      description,
      category,
      timestamp: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    handleSetAmountsArray(newAmount);

    if (type === "budget") {
      handleSetBudget(amount);
    } else {
      handleSetExpense(amount);
    }
    amountInput.value = "";
    categoryInput.value = "";
    descriptionSelect.value = "";

  }
  return (
    <>
      <div className='get-amount-container'>
        <div className="get-amount-inputs">
          <div className="get-amount-select">
            <select ref={categoryRef} className='get-amount-categories'>
              <option value="">Choose a category</option>
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
            <div className="icon-container">
              <i className='fa-solid fa-caret-down'></i>
            </div>
          </div>
          <input ref={descriptionRef} type="text" placeholder='Enter description' />
          <input ref={amountRef} type="number" placeholder='Enter amount' pattern="[0-9]*" />
        </div>
        <div className="get-amount-buttons">
          <button onClick={() => addAmount("budget")} className='add-amount budget'>Add Budget</button>
          <button onClick={() => addAmount("expense")} className='add-amount expense'>Add Expense</button>
        </div>
      </div>
    </>
  )
}