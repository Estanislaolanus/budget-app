import { useState } from 'react';
import './App.css';
import BudgetForm from './components/getAmount/getAmount';
import DisplayBudget from './components/DisplayBudget/DisplayBudget';
import { Amount } from './constants';
import DisplayLists from './components/DisplayLists/DisplayLists';

function App() {
  const [budgetArray, setBudgetArray] = useState<Amount[]>([]);
  const [expenseArray, setExpenseArray] = useState<Amount[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  function handleSetBudget(newBudget: number) {
    setBudget(newBudget);
  }
  function handleSetExpense(newExpense: number) {
    setExpense(newExpense);
  }
  function handleSetBudgetArray(newBudget: Amount) {
    setBudgetArray(prev => [...prev, newBudget]);
  }
  function handleSetExpenseArray(newExpense: Amount) {
    setExpenseArray(prev => [...prev, newExpense]);
  }
  return (
    <div className="app">
      <DisplayBudget budget={budget} expense={expense}/>
      <BudgetForm handleSetBudget={handleSetBudget} handleSetExpense={handleSetExpense}/>
      <DisplayLists/>
    </div>
  );
}

export default App;
