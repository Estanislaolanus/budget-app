import {ReactNode, Dispatch, SetStateAction} from 'react'
interface Amount {
    id: string;
    amount: number;
    type: string;
    description: string;
    category: string;
    timestamp: string;
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
interface SliderProps {
    budget: number;
    expense: number;
    amountArray: Amount[];
}
interface DisplayListsProps {
    amountArray: Amount[];
    deleteAmount: (id: string, type: string, amount:number) => void;
    setAmountArray: Dispatch<SetStateAction<Amount[]>>;
}
interface ListItemProps {
    amount: Amount;
    deleteAmount: (id: string, type: string, amount: number) => void;
    updateAmountArray: (id: string, object: Amount | Object) => void;
}

interface ContextProviderProps {
    children: ReactNode;
}
interface AuthContext {
    auth: Boolean;
    setAuth: Dispatch<SetStateAction<Boolean>>
}
interface UserContext {
    user: User;
    setUser: Dispatch<SetStateAction<User>>
}



export {
    type Amount,
    type User,
    type BudgetFormProps,
    type SliderProps, 
    type DisplayListsProps,
    type ListItemProps,
    type ContextProviderProps,
    type AuthContext,
    type UserContext
}