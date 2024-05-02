import './BarChart.css';
import { useEffect, useState } from 'react';
import { ExpensesChart, SliderProps } from '../../Types';
import getCategoryInfo from '../../utils/getCategoryInfo';

export default function BarChart({ totalExpense, expenseArray }: SliderProps) {
    const [expensesChart, setExpensesChart] = useState<ExpensesChart[]>([]);
    const [barData, setBarData] = useState<ExpensesChart>()
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        const expenses = new Map<string, ExpensesChart>();
        for (let i = 0; i < expenseArray.length; i++) {
            const e = expenseArray[i];
            const category = e.category;
            const color = getCategoryInfo(category).color;
            const amount = e.amount;
            const section: ExpensesChart = {
                id: e.id,
                amount,
                category,
                color,
                percent: Math.floor((amount / totalExpense) * 100)
            }
            if (!expenses.has(category)) {
                expenses.set(category, section);
            } else {
                const prevSection = expenses.get(category);
                if (!prevSection) continue;
                prevSection.amount += amount;
                prevSection.percent = Math.floor((prevSection.amount / totalExpense) * 100);
                expenses.set(category, prevSection);
            }
        }
        setExpensesChart(Array.from(expenses.values()).sort((a, b) => b.amount - a.amount));
    }, [expenseArray, totalExpense]);
    const displayChartData = (expense: ExpensesChart, touch = false) => {
        setShow(true);
        setBarData(expense);
        if (touch) {
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    }
    return (
        <div className='bar-chart'>
            <div className={`bar-info ${show ? "bar-info-show" : ""}`}>
                <div className='bar-section bar-category'>
                    {barData?.category !== "other" && <img src={getCategoryInfo(barData?.category || "").img || ""} alt="" />}
                    <p>{getCategoryInfo(barData?.category || "").name || ""}</p>
                </div>
                <div className='bar-section'>
                    <h4>Amount:</h4><p>${barData?.amount}</p>
                </div>
                <div className='bar-section'>
                    <h4>Percent:</h4><p>{barData?.percent}%</p>
                </div>

            </div>
            <ul className='y-axis'>
                <li><span>100%</span></li>
                <li><span>75%</span></li>
                <li><span>50%</span></li>
                <li><span>25%</span></li>
                <li><span>0%</span></li>
            </ul>
            <ul className="x-axis">
                {
                    expensesChart?.map(expense => {
                        return (
                            <li
                                onMouseOver={() => displayChartData(expense)}
                                onMouseOut={() => setShow(false)}
                                onTouchStart={() => displayChartData(expense, true)}
                                key={`x-axis-${expense.category}`}>
                                <span>{expense.category.slice(0, 3)}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <ul className="bars-container">
                {
                    expensesChart?.map(expense => {
                        return (
                            <li
                                onMouseOver={() => displayChartData(expense)}
                                onMouseOut={() => setShow(false)}
                                onTouchStart={() => displayChartData(expense, true)}
                                key={`bar-${expense.category}`} className='bar-item' style={{ height: `${expense.percent * 2}px`, background: expense.color }}>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
