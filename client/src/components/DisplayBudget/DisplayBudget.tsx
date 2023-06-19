import { useEffect, useState, useRef, RefObject } from 'react';
import { DisplayBudgetProps } from '../../constants';
import "./DisplayBudget.css"

export default function DisplayBudget({ budget, expense, amountArray }: DisplayBudgetProps) {
  const [balance, setBalance] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const percentRef: RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    const calculateBalance = budget - expense;
    setBalance(calculateBalance);

    const calculatePercentage = Math.floor(100 - ((expense / budget) * 100)) || 0;
    
    const isAdding = counter < calculatePercentage ?  1 : counter > calculatePercentage ? -1 : 0;
    if(calculatePercentage < 0) {
      setCounter(() => 0);
      return;
    }
    if(counter <= calculatePercentage || counter >= calculatePercentage)  {
      setTimeout(() => {
        setCounter(prev => prev + isAdding);
        if(!percentRef.current) return;
        percentRef.current.style.background = `conic-gradient(
          #00FF00 ${counter * 3.6}deg,
          #a5ffa5 ${counter * 3.6}deg
          )`;
      }, 10)

    }
  }, [counter, amountArray, expense, budget]);
  
  return (
    <div className='budget-display'>
      <div className='budget-progress-bar'>
        <div ref={percentRef} className="outer">
          <div className="inner">
            <div className='percentage'>{counter}%</div>
          </div>
        </div>
          
      </div>
      <div className="amounts-container">
        <div>Initial budget: ${budget}</div>
        <div>Balance: ${balance}</div>
      </div>
    </div>
  )
}
