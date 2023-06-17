import { useEffect, useState } from 'react';
import { DisplayBudgetProps } from '../../constants';
import "./DisplayBudget.css"

export default function DisplayBudget({ budget, expense }: DisplayBudgetProps) {
  const [balance, setBalance] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    const calculatePercentage = 100 - ((expense / budget) * 100);
    if(counter < calculatePercentage) {
      setTimeout(() => setCounter(prevCounter => prevCounter += 1), 50);
    }
  }, [counter, expense, budget]);

  useEffect(() => {
    const calculateBalance = budget - expense;
    setBalance(calculateBalance);
  }, [budget, expense]);
  
  return (
    <div className='budget-display'>
      <div className='budget-progress-bar'>
        <div className="outer">
          <div className="inner">
            <div className='percentage'>{counter}%</div>
          </div>
        </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stop-color="#e91e63" />
                <stop offset="100%" stop-color="#673ab7" />
              </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" stroke-linecap="round" />
          </svg>
      </div>
      <div className="amounts-container">
        <div>Initial budget: {budget}</div>
        <div>Balance: {balance}</div>
      </div>
    </div>
  )
}
