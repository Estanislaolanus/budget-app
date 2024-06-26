import "./GetAmount.css";
import { RefObject, useRef, useState } from 'react';
import { GetAmountProps, Expense, Income } from '../../Types';
import Dropdown from '../Dropdown/Dropdown';
export default function GetAmount({ typeOfTransaction, setAddTransaction, setTotalExpense, setTotalIncome, setExpenseArray, setIncomeArray, postExpense, postIncome }: Readonly<GetAmountProps>) {
  const amountRef: RefObject<HTMLInputElement> = useRef(null);
  const descriptionRef: RefObject<HTMLInputElement> = useRef(null);
  const alertRef: RefObject<HTMLDivElement> = useRef(null);
  const dateRef: RefObject<HTMLInputElement> = useRef(null);
  const sourceRef: RefObject<HTMLInputElement> = useRef(null);
  const [category, setCategory] = useState<'transportation' | 'groceries' | 'personalCare' | 'debtPayents' | 'taxes' | 'entertainment' | 'education' | 'insurance' | 'housing' | 'other'>("other");
  const [isFixed, setIsfixed] = useState<boolean>(false)

  function compareDate(date: Date): boolean {
    const comparisonDate: Date = new Date();
    const comparison = date.getMonth() === comparisonDate.getMonth() && date.getFullYear() === comparisonDate.getFullYear();
    return comparison;
  }
  async function addAmount(typeOfTransaction: "income" | "expense") {
    const amountInput = amountRef.current;
    const descriptionSelect = descriptionRef.current;
    const sourceInput = sourceRef.current;
    if (!amountInput || !descriptionSelect) return;
    const amount: number = parseInt(amountInput.value);
    const description: string = descriptionSelect.value;
    const type: "fixed" | "regular" = isFixed ? "fixed" : "regular";
    const currentDate = new Date();
    const date = dateRef.current?.valueAsDate ?? currentDate;
    if (date.getFullYear() > currentDate.getFullYear() ||
      (date.getFullYear() === currentDate.getFullYear() && date.getMonth() > currentDate.getMonth()) ||
      (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDay() > currentDate.getDay())) return;
    if (!amount || amount <= 0) return;
    let expense: Expense;
    let income: Income;
    if (typeOfTransaction === "expense") {
      if (!category) return;
      const newExpense: Expense = {
        id: '',
        amount,
        category,
        description,
        type,
        timestamp: date,
        updated_at: date,
      }
      const data = await postExpense(newExpense);
      if (!data) return;
      const expenseRes: Expense = data.expense;
      expense = expenseRes;
    } else {
      if (!sourceInput) return;
      const source = sourceInput.value;
      const newIncome: Income = {
        id: '',
        amount,
        source,
        description,
        type,
        timestamp: date,
        updated_at: date,
      }
      const data = await postIncome(newIncome);
      if (!data) return;
      const incomeRes: Income = data.income;
      income = incomeRes;
    }
    const isSameMonth = compareDate(date);
    if (!isSameMonth) {
      setAddTransaction(false);
      amountInput.value = "";
      descriptionSelect.value = "";
      return;
    }
    if (typeOfTransaction === "expense") {
      setTotalExpense(prev => prev + amount);
      setExpenseArray(prev => [...prev, expense]);

    } else {
      setTotalIncome(prev => prev + amount);
      setIncomeArray(prev => [...prev, income]);
    }
    setAddTransaction(false);
    amountInput.value = "";
    descriptionSelect.value = "";

  }
  return (
    <>
      <div className="background-screen"></div>
      <div ref={alertRef} className='get-amount-container'>
        <div className="get-amount-title">{typeOfTransaction === "expense" ? <h3>Expense</h3> : <h3>Income</h3>}</div>
        <button onClick={() => setAddTransaction(false)} className='close-btn'>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20L4 4.00003M20 4L4.00002 20" stroke="#000000" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <div className="get-amount-fields">
          {typeOfTransaction === "income" ? <div className="input-field">
            <input ref={sourceRef} type="text" placeholder="Enter source" />
          </div> : <Dropdown setCategory={setCategory} category={category} />}
          <div className='input-field'>
            <input ref={amountRef} type="number" placeholder='Enter amount' pattern="[0-9]*" />
          </div>
          <div className='input-field'>
            <input ref={descriptionRef} type="text" placeholder='Enter description' />
          </div>
          <div className='input-field'>
            <input type="date" ref={dateRef} placeholder='Enter date' />
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 610.40 610.40" >

                <g> <g> <g> <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052 c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553 V35.544V24.992C180.791,11.188,171.291,0,159.567,0z" /> <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992 h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z" /> <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117 V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818 c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764 V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z" /> <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z" /> <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017 c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z" /> <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z" /> <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z" /> <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z" /> <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032 c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z" /> <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z" /> <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z" /> </g> </g> </g>

              </svg>
            </span>
          </div>
          <div className="input-checkbox"><input onClick={() => setIsfixed(!isFixed)} type="checkbox" /><span>Fixed</span></div>
        </div>
        <div className="get-amount-buttons">
          <button onClick={() => addAmount(typeOfTransaction)} className='add-amount'>Add Transacion</button>
        </div>
      </div>
    </>
  )
}
