import {ReactNode, Dispatch, SetStateAction} from 'react'
interface Amount {
    id: string;
    amount: number;
    type: string;
    category: string;
    timestamp: number;
}
interface User {
    username: string;
    email: string;
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

interface AuthProviderProps {
    children: ReactNode;
}
interface UserContext {
    auth: Boolean;
    setAuth: Dispatch<SetStateAction<Boolean>>
}


export {
    type Amount,
    type User,
    type BudgetFormProps,
    type DisplayBudgetProps, 
    type DisplayListsProps,
    type ListItemProps,
    type AuthProviderProps,
    type UserContext

}