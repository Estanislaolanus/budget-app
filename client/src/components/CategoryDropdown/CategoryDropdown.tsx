import './CategoryDropdown.css';
import { useState, useRef, RefObject, useEffect } from 'react';
import { Amount, DisplayListSectionProps } from '../../Types';
import ListItem from '../ListItem/ListItem';
import getCategoryInfo from '../../utils/getCategoryInfo';
export default function CategoryDropDown({ amountArray, ...rest }: Readonly<DisplayListSectionProps>) {
    const ulRef: RefObject<HTMLUListElement> = useRef(null);
    const [select, setSelect] = useState<boolean>(false);
    const amount: Amount = amountArray[0];

    useEffect(() => {
        const ul = ulRef.current;
        if (!ul) return;
        if (ul.classList.contains("items-container-open")) {
            let height = 0;
            const children = Array.from(ul.children);
            for (const child of children) {
                height += child.clientHeight;
            }
            ul.style.height = height + "px";
        }
    }, [amountArray])
    const onSelect = () => {
        const ul = ulRef.current;
        if (!ul) return;
        if (!ul.classList.contains("items-container-open")) {
            let height = 0;
            const children = Array.from(ul.children);
            for (const child of children) {
                height += child.clientHeight;
            }
            ul.style.height = height + "px";
        } else {
            ul.style.margin = "0";
            ul.style.height = "0";
        }
        ul.classList.toggle("items-container-open");
        setSelect(!select);
    }
    return (
        <div className="category-section" >
            <button className={`category-bar ${select ? "category-bar-open" : ""}`} onClick={() => onSelect()}>
                <div className='category-info'>
                    {amount.type === "budget" ?
                        <img src="./assets/categories/income.png" alt="" /> :
                        <img src={getCategoryInfo(amount.category).img} alt="" />}
                    <div className='category-text'>
                        <div className='category-title'>{
                            amount.type === "budget" ? "Income" :
                                getCategoryInfo(amount.category).name
                        }</div>
                        <div className='category-transaction'>Transactions: {amountArray.length}</div>
                    </div>
                </div>
                <div className={`caret ${select ? "caret-rotate" : ""}`}>
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                        <g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z" /> </g>

                    </svg>
                </div>
            </button>
            <ul ref={ulRef} className="items-container">
                {
                    amountArray.map(a => {
                        return <ListItem key={a.id} amount={a} {...rest} />
                    })
                }
            </ul>
        </div>
    )
}