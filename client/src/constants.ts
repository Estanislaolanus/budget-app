
interface Amount {
    id: string;
    amount: number;
    type: string;
    category: string;
    timestamp: number;
}
interface BudgetFormProps {
    handleSetBudget: (newBudget: number) => void;
    handleSetExpense: (newExpense: number) => void;
    handleSetBudgetArray: (newBudget: Amount) => void;
    handleSetExpenseArray: (newExpense: Amount) => void;
}
interface DisplayBudgetProps {
    budget: number;
    expense: number;
}
interface DisplayListsProps {
    budgetArray: Amount[];
    expenseArray: Amount[];
    deleteAmount: (id: string, type: string) => void;
}
interface ListItemProps {
    amount: Amount;
    deleteAmount: (id: string, type: string) => void;
}



export {
    type Amount,
    type BudgetFormProps,
    type DisplayBudgetProps, 
    type DisplayListsProps,
    type ListItemProps
}