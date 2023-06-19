
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
    handleSetAmountsArray: (newAmount: Amount) => void;
}
interface DisplayBudgetProps {
    budget: number;
    expense: number;
    amountArray: Amount[];
}
interface DisplayListsProps {
    amountArray: Amount[];
    deleteAmount: (id: string, type: string, amount:number) => void;
}
interface ListItemProps {
    amount: Amount;
    deleteAmount: (id: string, type: string, amount: number) => void;
}



export {
    type Amount,
    type BudgetFormProps,
    type DisplayBudgetProps, 
    type DisplayListsProps,
    type ListItemProps
}