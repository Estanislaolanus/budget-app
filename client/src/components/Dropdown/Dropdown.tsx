import { useEffect, useState, useRef, RefObject } from 'react';
import { DropdownProps } from '../../Types';
import getCategory from '../../utils/getCategoryInfo'
import './Dropdown.css';

export default function Dropdown({category: cat, setCategory}: DropdownProps) {
    const [select, setSelect] = useState<boolean>(false);
    const [textField, setTextField] = useState<string>("");
    const dropdownRef: RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if(!cat) setTextField("Choose a category");
    }, [cat]);
    useEffect(() => {
    const handleClick = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setSelect(false)
        }
    }
    document.addEventListener("click", handleClick);
    return () => {
        document.removeEventListener("click", handleClick);
    };
    }, []);
    const onSelect = (category: string) => {
        setCategory(category);
        setTextField(category === "income" ? "Income" : getCategory(category).name);
        setSelect(false);
    }
    
    return (
        <div className='dropdown' ref={dropdownRef}>
            <div onClick={() => setSelect(!select)} className="select">
                <span>{textField || "Choose a category"}</span> 
                <div className={`caret ${select ? "caret-rotate" : ""}`}><i className='fa-solid fa-caret-down'></i></div>
            </div>
            <ul className={`menu ${select ? "menu-open" : ""}`}>
                <li onClick={() => onSelect("groceries")}>
                    <img src="./assets/categories/grocery.png" alt="" />
                    <div className="list-title">Groceries</div>
                </li>
                <li onClick={() => onSelect("entertainment")}>
                    <img src="./assets/categories/entertainment.png" alt="" />
                    <div className="list-title">Entertainment</div>
                </li>
                <li onClick={() => onSelect("taxes")}>
                    <img src="./assets/categories/tax.png" alt="" />
                    <div className="list-title">Taxes</div>
                </li>
                <li onClick={() => onSelect("transportation")}>
                    <img src="./assets/categories/transportation.png" alt="" />
                    <div className="list-title">Transportation</div>
                </li>
                <li onClick={() => onSelect("education")}>
                    <img src="./assets/categories/education.png" alt="" />
                    <div className="list-title">Education</div>
                </li>
                <li onClick={() => onSelect("housing")}>
                    <img src="./assets/categories/housing.png" alt="" />
                    <div className="list-title">Housing</div>
                </li>
                <li onClick={() => onSelect("personalCare")}>
                    <img src="./assets/categories/personal-care.png" alt="" />
                    <div className="list-title">Personal Care</div>
                </li>
                <li onClick={() => onSelect("insurance")}>
                    <img src="./assets/categories/insurance.png" alt="" />
                    <div className="list-title">Insurance</div>
                </li>
                <li onClick={() => onSelect("debtPayents")}>
                    <img src="./assets/categories/debt.png" alt="" />
                    <div className="list-title">Debt Payents</div>
                </li>
                <li onClick={() => onSelect("other")}>
                    <div className="list-title">Other</div>
                </li>
            </ul>
        </div>
    )
}
