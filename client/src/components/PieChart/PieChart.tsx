import { RefObject, useEffect, useRef } from 'react'
import { SliderProps } from '../../Types'
import getCategoryAndColor from '../../utils/getCategoryAndColor'
import './PieChart.css'

export default function PieChart({ expense, amountArray }: SliderProps) {
    const pieChartRef: RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (!pieChartRef.current || amountArray.length === 0) return;
        const expensesChart: Array<{ id: string, amount: number, category: string, color: string }> = [];
        const percents: Array<number> = [];
        for (let i = 0; i < amountArray.length; i++) {
            const a = amountArray[i];
            if (a.type === "expense") {
                const color = getCategoryAndColor(a.category).color;
                const category = a.category;
                const section = {
                    id: a.id,
                    amount: a.amount,
                    color,
                    category
                }
                expensesChart.push(section);
            }
        }
        expensesChart.sort((a, b) => a.category.localeCompare(b.category, 'en', { sensitivity: 'base' }));
        if (expensesChart.length === 0) return;
        for (let i = 0; i < expensesChart.length; i++) {
            const percent = Math.floor((expensesChart[i].amount / expense) * 100);
            const prevPercent = percents[i - 1] || 0;
            percents.push(percent + prevPercent);
        }
        const sections = [];
        for (let i = 1; i < expensesChart.length; i++) {
            const color = expensesChart[i].color;
            const percent = Math.floor((percents[i] || 0) * 3.6);
            const prevPercent = Math.floor((percents[i - 1] || 0) * 3.6);
            if (i === expensesChart.length - 1) {
                const section = `${color} ${prevPercent}deg`;
                sections.push(section);
                break;
            }
            const section = `${color} ${prevPercent}deg ${percent}deg`;
            sections.push(section);
        }
        const background = `conic-gradient(
            ${expensesChart[0].color} ${(percents[0] || 0) * 3.6}deg,
            ${sections.join(", ")}
        )`;
        pieChartRef.current.style.background = expensesChart.length === 1 ? expensesChart[0].color : background;
    }, [amountArray, expense]);

    const array = amountArray.filter(a => a.type === "expense").map(a => {
        const category = a.category;
        const color = getCategoryAndColor(category).color;
        return { category, color, amount: a.amount };
    }).sort((a, b) => a.category.localeCompare(b.category));
    let sections: Array<{category:string, color:string, amount: number, percent: number}> = [];
    for(let i = 0; i < array.length; i++) {
        const category = array[i].category
        if(array[i - 1]) {
            const prevCategory = array[i - 1].category;
    
            if(prevCategory === category) {
                const len = sections.length - 1;
                if(!sections[len]) continue;
                const percent = Math.floor((array[i].amount / expense) * 100);
                sections[len].amount = sections[len].amount + array[i].amount;
                sections[len].percent = sections[len].percent + percent;
                continue;
            };
        };
        const percent = Math.floor((array[i].amount / expense) * 100);
        sections.push({category, amount: array[i].amount, color: array[i].color, percent});
    }
    sections = sections.sort((a, b) => b.percent - a.percent);
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
                    {sections.map(a => {
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
