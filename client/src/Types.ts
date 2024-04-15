import { ReactNode, Dispatch, SetStateAction } from 'react'
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
    isEmailVerified: boolean;
}

interface SliderProps {
    budget: number;
    expense: number;
    amountArray: Amount[];
}
interface DisplayListsProps {
    amountArray: Amount[];
    deleteAmount: (id: string, type: string, amount: number) => void;
    setAmountArray: Dispatch<SetStateAction<Amount[]>>;
    setBudget: Dispatch<SetStateAction<number>>;
    setExpense: Dispatch<SetStateAction<number>>;
    postAmount: (newAmount: Amount) => void;
}
interface GetAmountProps {
    setBudget: Dispatch<SetStateAction<number>>;
    setExpense: Dispatch<SetStateAction<number>>;
    setAmountArray: Dispatch<SetStateAction<Amount[]>>;
    setAddTransaction: Dispatch<SetStateAction<boolean>>;
    postAmount: (newAmount: Amount) => void;
    type: string;
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
    auth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>
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
    type GetAmountProps,
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