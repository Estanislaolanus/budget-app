import { useEffect, useState, useRef, RefObject } from 'react';
import { SliderProps } from '../../Types';
import "./DisplayBudget.css";

export default function DisplayBudget({ totalIncome, totalExpense }: Readonly<SliderProps>) {
  const [balance, setBalance] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [color, setColor] = useState<string>(counter >= 5 ? "red" : "#50f93a");
  const percentRef: RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    const calculatePercentage = Math.floor(100 - ((totalExpense / totalIncome) * 100)) || 0;
    const calculateBalance = totalIncome - totalExpense;
    setColor(() => calculatePercentage <= 5 ? "#ff3760" : "#50f93a");
    setBalance(calculateBalance);

    const isCounterHigher = counter > calculatePercentage ? -1 : 0
    const isAdding = counter < calculatePercentage ? 1 : isCounterHigher;

    if (counter <= calculatePercentage || counter >= calculatePercentage) {
      setTimeout(() => {
        setCounter(prev => prev + isAdding);
        if (!percentRef.current) return;
        percentRef.current.style.background = `conic-gradient(
          ${color} ${counter * 3.6}deg,
          ${counter <= 5 ? "#ff3760" : "#fff"} ${counter * 3.6}deg
          )`;
      }, 10)
    }
  }, [counter, totalExpense, totalIncome, color]);

  return (
    <div className='budget-display'>
      <div className='budget-progress-bar'>
        <div ref={percentRef} className="outer">
          <div className="inner">
            <div className='percentage'>{balance < 0 ? "-" : ""}${Math.abs(balance)}</div>
            <div className='inner-text'>Safe-to-Spend</div>
          </div>
        </div>
      </div>
    </div>
  )
}
