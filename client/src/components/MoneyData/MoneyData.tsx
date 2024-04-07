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
            <svg id="visual" viewBox="0 0 900 600" width="650" height="250" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 446L21.5 454.5C43 463 86 480 128.8 476.3C171.7 472.7 214.3 448.3 257.2 428.8C300 409.3 343 394.7 385.8 397.8C428.7 401 471.3 422 514.2 435.2C557 448.3 600 453.7 642.8 454.8C685.7 456 728.3 453 771.2 446C814 439 857 428 878.5 422.5L900 417L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z" stroke-linecap="round" stroke-linejoin="miter"></path></svg>
        </div>
    )
}
