import "./DisplayLists.css";
import { useState } from 'react';
import { Amount, DisplayListsProps } from '../../Types';
import Axios from "../../api/Axios";
import DisplayListSection from "../DisplayListSection/DisplayListSection";
import GetAmount from "../GetAmount/GetAmount";
export default function DisplayLists({ amountArray, deleteAmount, setAmountArray, setBudget, setExpense, ...rest }: DisplayListsProps) {
    const [addTransaction, setAddTransaction] = useState<boolean>(false);
    const [typeOfTransaction, setTypeOfTransaction] = useState<string>("");
    const budgetArray: Amount[] = amountArray.filter(a => a.type === 'budget');
    const expenseArray: Amount[] = amountArray.filter(a => a.type === 'expense');
    const setTransaction = (type: string) => {
        setTypeOfTransaction(type);
        setAddTransaction(!addTransaction);
    }
    async function updateAmountArray(id: string, object: Amount | Object, money?: number, type?: string) {
        const idx = amountArray.findIndex(a => a.id === id);
        if (idx === -1) return;
        let amount = { ...amountArray[idx] };

        Object.entries(object).forEach(([key, value]) => {
            if (key && amount && object.hasOwnProperty(key)) {
                (amount as any)[key] = value;
            }
        });
        setAmountArray(prev => {
            prev.splice(idx, 1, amount);
            return prev;
        });
        if (type === "budget") {
            if (typeof money === "number") setBudget(prev => {
                const newAmount = prev + money
                return newAmount;
            });
        } else {
            if (typeof money === "number") setExpense(prev => {
                const newAmount = prev + money
                return newAmount;
            });
        }
        try {
            const accessToken = localStorage.getItem("accessToken");
            await Axios.put(`/amount/${id}`, object, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                withCredentials: true
            });
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            {addTransaction && <GetAmount setAddTransaction={setAddTransaction} type={typeOfTransaction} {...rest} />}
            <div className="lists">
                <div className="budget-list list">
                    <div className="list-header">
                        <div className="list-title">Budget List</div>
                        <button onClick={() => setTransaction("budget")} className="add add-1">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" >
                                <g>
                                    <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="list-body">
                        {
                            <DisplayListSection key="budget" amountArray={budgetArray} updateAmountArray={updateAmountArray} deleteAmount={deleteAmount} />
                        }
                    </div>
                </div>
                <div className="expense-list list">
                    <div className="list-header">
                        <div className="list-title">Expense List</div>
                        <button onClick={() => setTransaction("expense")} className="add add-2">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" >
                                <g>
                                    <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="list-body">
                        {
                            <DisplayListSection key="expense" amountArray={expenseArray} updateAmountArray={updateAmountArray} deleteAmount={deleteAmount} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
