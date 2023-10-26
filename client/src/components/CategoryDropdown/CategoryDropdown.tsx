import'./CategoryDropdown.css';
import { useState, useRef, RefObject, useEffect } from 'react';
import { Amount, DisplayListSectionProps } from '../../Types';
import ListItem from '../ListItem/ListItem';
import getCategoryInfo from '../../utils/getCategoryInfo';
export default function CategoryDropDown({amountArray, ...rest}:DisplayListSectionProps) {
    const ulRef:RefObject<HTMLUListElement> = useRef(null);
    const [select, setSelect] = useState<boolean>(false);
    const amount: Amount = amountArray[0];
    
    useEffect(() => {
        const ul = ulRef.current;
        if(!ul) return;
        if(ul.classList.contains("items-container-open")) {
            let height = 0;
            const children = Array.from(ul.children);
            for(const child of children) {
                height += child.clientHeight + 10;
            }
            ul.style.height = height + "px";
        }
    }, [amountArray])
    const onSelect = () => {
        const ul = ulRef.current;
        if(!ul) return;
        if(!ul.classList.contains("items-container-open")) {
            let height = 0;
            const children = Array.from(ul.children);
            for(const child of children) {
                height += child.clientHeight + 10;
            }
            ul.style.margin = "10px 0";
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
        <div className={`category-bar ${select ? "category-bar-open" : ""}`} onClick={() => onSelect()}>
            <div className='category-info'>
                {amount.type === "budget" ? 
                <img src="./assets/categories/income.png" alt=""/> : 
                <img src={getCategoryInfo(amount.category).img} alt=""/>}
                <div className='category-text'>
                    <div className='category-title'>{
                        amount.type === "budget" ? "Income" :
                        getCategoryInfo(amount.category).name
                    }</div>
                    <div className='category-transaction'>Transactions: {amountArray.length}</div>
                </div>
            </div>
            <div className={`caret ${select ? "caret-rotate" : ""}`}><i className='fa-solid fa-caret-down'></i></div>
        </div>
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