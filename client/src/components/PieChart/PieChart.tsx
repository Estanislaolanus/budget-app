import { RefObject, useEffect, useRef, useState } from 'react'
import { ExpensesChart, SliderProps } from '../../Types'
import getCategoryAndColor from '../../utils/getCategoryInfo'
import './PieChart.css'
import getCategoryInfo from '../../utils/getCategoryInfo';

export default function PieChart({ expense, amountArray }: SliderProps) {
    const [pieChart, setPieChart] = useState<ExpensesChart[]>([]);
    const pieChartRef: RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (!pieChartRef.current || amountArray.length === 0) return;
        const expenses = new Map<string, ExpensesChart>();
        for (let i = 0; i < amountArray.length; i++) {
            const a = amountArray[i];
            if (a.type === "expense") {
                const category = a.category;
                const color = getCategoryInfo(category).color;
                const amount = a.amount;
                const section: ExpensesChart = {
                    id: a.id,
                    amount,
                    category,
                    color,
                    percent: Math.floor((amount / expense) * 100)
                }
                if (!expenses.has(category)) {
                    expenses.set(category, section);
                } else {
                    const prevSection = expenses.get(category);
                    if (!prevSection) continue;
                    prevSection.amount += amount;
                    prevSection.percent = Math.floor((prevSection.amount / expense) * 100);
                    expenses.set(category, prevSection);
                }
            }
        }
        if (expenses.size === 0) return;
        const expensesChart:ExpensesChart[] = Array.from(expenses.values()).sort((a, b) => b.amount - a.amount);
        setPieChart(expensesChart);
        
        const sections = [];
        let acc = Math.floor((expensesChart[0].percent || 0) * 3.6);
        let prevAcc = 0;
        for (let i = 1; i < expensesChart.length; i++) {
            const color = expensesChart[i].color;
            const percent = Math.floor((expensesChart[i].percent || 0) * 3.6);
            prevAcc = i === 1 ? 0 : acc;
            acc += percent;
            if (i === expensesChart.length - 1) {
                const section = `${color} ${prevAcc}deg`;
                sections.push(section);
                break;
            }
            const section = `${color} ${prevAcc}deg ${acc}deg`;
            sections.push(section);
        }
        const background = `conic-gradient(
            ${expensesChart[0].color} ${(expensesChart[0].percent || 0) * 3.6}deg,
            ${sections.join(", ")}
        )`;
        pieChartRef.current.style.background = expensesChart.length === 1 ? expensesChart[0].color : background;
    }, [amountArray, expense]);
    return (
        <>
            <div className="pie-chart-header">
                <div className='pie-chart-title'>Expenses Pie Chart</div>
                <div className='pie-chart-expense'>${expense}</div>
            </div>
            <div className='pie-chart-container'>

                <div ref={pieChartRef} className="pie-chart">
                    <div className="inner-circle"></div>
                    <div className="inner-circle-grey"></div>
                </div>

                <div className='category-list'>
                    {pieChart.map(a => {
                        const color = getCategoryAndColor(a.category).color;
                        const category = getCategoryAndColor(a.category).category;
                        return (
                            <div key={color} className='category-item'>
                                <div className='category-text'> 
                                <span className='category-color' style={{ background: color }}></span>
                                    {category}</div>
                                <div className='category-amount'>${a.amount} <div>{a.percent}%</div></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
