import { ReactNode, Dispatch, SetStateAction } from 'react'

interface Expense {
    id: string;
    amount: number;
    category: 'transportation' | 'groceries' | 'personalCare' | 'debtPayents' | 'taxes' | 'entertainment' | 'education' | 'insurance' | 'housing' | 'other';
    description: string,
    type: 'fixed' | 'regular';
    timestamp: Date;
    updated_at: Date;
}
interface Income {
    id: string;
    amount: number;
    source: string,
    description: string,
    type: 'fixed' | 'regular';
    timestamp: Date;
    updated_at: Date;
}
interface User {
    username: string;
    email: string;
    isEmailVerified: boolean;
}
type TypeOfTransaction = "expense" | "income";
interface SliderProps {
    totalIncome: number;
    totalExpense: number;
    expenseArray: Expense[];
    incomeArray: Income[];
}
interface DisplayListsProps {
    expenseArray: Expense[];
    incomeArray: Income[];
    deleteTransaction: (id: string, type: TypeOfTransaction, amount: number) => void;
    setTotalIncome: Dispatch<SetStateAction<number>>;
    setTotalExpense: Dispatch<SetStateAction<number>>;
    setExpenseArray: Dispatch<SetStateAction<Expense[]>>;
    setIncomeArray: Dispatch<SetStateAction<Income[]>>;
    postIncome: (income: Income) => Promise<any>;
    postExpense: (expense: Expense) => Promise<any>;
    updateTransactionArray: (id: string, object: Object, typeOfTransaction: TypeOfTransaction, money?: number) => void;
    // setTypeOfTransaction: Dispatch<SetStateAction<TypeOfTransaction>>;
    // typeOfTransaction: TypeOfTransaction;
}

interface DisplayListSectionProps {
    expenseArray: Expense[];
    incomeArray: Income[];
    typeOfTransaction: TypeOfTransaction;
    deleteTransaction: (id: string, type: TypeOfTransaction, amount: number) => void;
    updateTransactionArray: (id: string, object: Object, typeOfTransaction: TypeOfTransaction, money?: number) => void;
}
interface ListItemProps {
    transaction: Expense | Income;
    typeOfTransaction: TypeOfTransaction;
    deleteTransaction: (id: string, type: TypeOfTransaction, amount: number) => void;
    updateTransactionArray: (id: string, object: Object, typeOfTransaction: TypeOfTransaction, money?: number) => void;
}
interface GetAmountProps {
    setTotalIncome: Dispatch<SetStateAction<number>>;
    setTotalExpense: Dispatch<SetStateAction<number>>;
    setExpenseArray: Dispatch<SetStateAction<Expense[]>>;
    setIncomeArray: Dispatch<SetStateAction<Income[]>>;
    setAddTransaction: Dispatch<SetStateAction<boolean>>;
    postIncome: (income: Income) => Promise<any>;
    postExpense: (expense: Expense) => Promise<any>;
    typeOfTransaction: TypeOfTransaction;
}
interface ContextProviderProps {
    children: ReactNode;
}

interface DropdownProps {
    setCategory: Dispatch<SetStateAction<'transportation' | 'groceries' | 'personalCare' | 'debtPayents' | 'taxes' | 'entertainment' | 'education' | 'insurance' | 'housing' | 'other'>>;
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
    type Expense,
    type Income,
    type User,
    type TypeOfTransaction,
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
};
