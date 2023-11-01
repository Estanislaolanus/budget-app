import {ReactNode, Dispatch, SetStateAction} from 'react'
interface Amount {
    id: string;
    amount: number;
    type: string;
    description: string;
    category: string;
    timestamp: Date;
}
interface User {
    username: string;
    email: string;
}

interface BudgetFormProps {
    handleSetBudget: (newBudget: number) => void;
    handleSetExpense: (newExpense: number) => void;
    handleSetAmountsArray: (newAmount: Amount) => void;
    setAddTransaction: Dispatch<SetStateAction<boolean>>;
    type: string;
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
    setBudget: Dispatch<SetStateAction<number>>;
    setExpense: Dispatch<SetStateAction<number>>;
    handleSetBudget: (newBudget: number) => void;
    handleSetExpense: (newExpense: number) => void;
    handleSetAmountsArray: (newAmount: Amount) => void;
}
interface DisplayListSectionProps {
    amountArray: Amount[];
    deleteAmount: (id: string, type: string, amount: number) => void;
    updateAmountArray: (id: string, object: Amount | Object, money?: number, type?: string) => void;
}
interface ListItemProps {
    amount: Amount;
    deleteAmount: (id: string, type: string, amount: number) => void;
    updateAmountArray: (id: string, object: Amount | Object, money?: number, type?: string) => void;
}

interface ContextProviderProps {
    children: ReactNode;
}

interface DropdownProps {
    setCategory: Dispatch<SetStateAction<string>>;
    category: string;
}

interface AuthContext {
    auth: Boolean;
    setAuth: Dispatch<SetStateAction<Boolean>>
}
interface UserContext {
    user: User;
    setUser: Dispatch<SetStateAction<User>>
}
interface DateContext {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>
}
interface ExpensesChart {
    id: string;
    amount: number;
    percent: number;
    category: string;
    color: string;
}


export {
    type Amount,
    type User,
    type BudgetFormProps,
    type SliderProps, 
    type DisplayListsProps,
    type DisplayListSectionProps,
    type ListItemProps,
    type ContextProviderProps,
    type DropdownProps,
    type AuthContext,
    type UserContext,
    type DateContext,
    type ExpensesChart
}