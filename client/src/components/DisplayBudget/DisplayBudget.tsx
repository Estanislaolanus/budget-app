import { useEffect, useState, useRef, RefObject } from 'react';
import { SliderProps } from '../../Types';
import "./DisplayBudget.css";

export default function DisplayBudget({ budget, expense, amountArray }: SliderProps) {
  const [balance, setBalance] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [color, setColor] = useState<string>(counter >= 5 ? "red" : "#50f93a");
  const percentRef: RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    const calculatePercentage = Math.floor(100 - ((expense / budget) * 100)) || 0;
    const calculateBalance = budget - expense;
    setColor(() => {
      const newColor = calculatePercentage <= 5 ? "red" : "#50f93a";
      return newColor
    });
    setBalance(calculateBalance);

    
    const isAdding = counter < calculatePercentage ?  1 : counter > calculatePercentage ? -1 : 0;
    if(calculatePercentage <= 0 && counter === 0) {
      if(!percentRef.current) return;
        percentRef.current.style.background = `conic-gradient(
          ${color} ${counter * 3.6}deg,
          #a5ffa5 ${counter * 3.6}deg
          )`;
      return;
    };
    if(counter <= calculatePercentage || counter >= calculatePercentage)  {
      setTimeout(() => {
        setCounter(prev => prev + isAdding);
        if(!percentRef.current) return;
        percentRef.current.style.background = `conic-gradient(
          ${color} ${counter * 3.6}deg,
          #fff ${counter * 3.6}deg
          )`;
      }, 10)
    }
  }, [counter, amountArray, expense, budget, color]);
  
  return (
    <div className='budget-display'>
      <div className='budget-progress-bar'>
        <div ref={percentRef} className="outer">
          <div className="inner">
            <div className='percentage'>${balance}</div>
            <div className='inner-text'>Safe-to-Spend</div>
          </div>
        </div>
      </div>
    </div>
  )
}
