import "./MoneyData.css";
import { SliderProps } from '../../Types';

export default function MoneyData({ budget, expense }: Readonly<SliderProps>) {
    return (
        <div className='money-data-container'>
            <div className='amount-display reverse'>
                <div className="amount-display-title">Safe-to-Spend</div>
                <div className="amount-display-amount safe-to-spend alt-grey">{budget - expense < 0 ? "-" : ""}${Math.abs(budget - expense)}</div>
            </div>
            <div className='money-ex-bu'>
                <div className='amount-display'>
                    <div className="amount-display-title">Budget</div>
                    <div className="amount-display-amount">${budget}</div>
                </div>
                <div className='amount-display'>
                    <div className="amount-display-title">Expense</div>
                    <div className="amount-display-amount alt-red">{expense === 0 ? "" : "-"}${expense}</div>
                </div>
            </div>
        </div>
    )
}
