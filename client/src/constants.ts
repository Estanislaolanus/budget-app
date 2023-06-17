
interface Amount {
    amount: number;
    type: string;
}
interface BudgetFormProps {
    handleSetBudget: (newBudget: number) => void;
    handleSetExpense: (newExpense: number) => void;
}
interface DisplayBudgetProps {
    budget: number;
    expense: number;
}



export {
    type Amount,
    type BudgetFormProps,
    type DisplayBudgetProps
}