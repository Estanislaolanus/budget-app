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
    setBudget(prev => prev + newBudget);
  }
  function handleSetExpense(newExpense: number) {
    setExpense(prev => prev + newExpense);
  }
  function handleSetBudgetArray(newBudget: Amount) {
    setBudgetArray(prev => [...prev, newBudget]);
  }
  function handleSetExpenseArray(newExpense: Amount) {
    setExpenseArray(prev => [...prev, newExpense]);
  }
  function deleteAmount (id:string, type:string) {
    if(type === "budget") {
        setBudgetArray(prev => {
          const newArray = prev.filter(a => a.id !== id);
          return newArray;
        })
    } else {
      setExpenseArray(prev => {
        const newArray = prev.filter(a => a.id !== id);
        return newArray;
      })
    }
}
  return (
    <div className="app">
      <DisplayBudget budget={budget} expense={expense}/>
      <BudgetForm 
      handleSetBudget={handleSetBudget} 
      handleSetExpense={handleSetExpense} 
      handleSetBudgetArray={handleSetBudgetArray} 
      handleSetExpenseArray={handleSetExpenseArray}
      />
      <DisplayLists 
      budgetArray={budgetArray}
      expenseArray={expenseArray}
      deleteAmount={deleteAmount}
      />
    </div>
  );
}

export default App;
