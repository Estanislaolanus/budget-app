import { useEffect, useState, useRef, RefObject } from 'react';
import { SliderProps } from '../../Types';
import "./DisplayBudget.css";

export default function DisplayBudget({ budget, expense, amountArray }: SliderProps) {
  const [balance, setBalance] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const percentRef: RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    const calculateBalance = budget - expense;
    setBalance(calculateBalance);

    const calculatePercentage = Math.floor(100 - ((expense / budget) * 100)) || 0;
    
    const isAdding = counter < calculatePercentage ?  1 : counter > calculatePercentage ? -1 : 0;
    if(calculatePercentage <= 0 && counter === 0) {
      if(!percentRef.current) return;
        percentRef.current.style.background = `conic-gradient(
          #00FF00 ${counter * 3.6}deg,
          #a5ffa5 ${counter * 3.6}deg
          )`;
      return;
    };
    if(counter <= calculatePercentage || counter >= calculatePercentage)  {
      setTimeout(() => {
        setCounter(prev => prev + isAdding);
        if(!percentRef.current) return;
        percentRef.current.style.background = `conic-gradient(
          #00FF00 ${counter * 3.6}deg,
          #d9ffd9 ${counter * 3.6}deg
          )`;
      }, 10)
    }
  }, [counter, amountArray, expense, budget]);
  
  return (
    <div className='budget-display'>
      <div className="amounts-container">
        <div className='amount'>
          <div className="amount-title">Initial</div>
          <div className="amount-number">${budget}</div>
        </div>
        <div className='amount'>
          <div className="amount-title" style={{color: "#00FF00"}}>Balance</div>
          <div className="amount-number" style={{color: "#00FF00"}}>${balance}</div>
        </div>
      </div>
      <div className='budget-progress-bar'>
        <div ref={percentRef} className="outer">
          <div className="inner">
            <div className='percentage'>{counter}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
