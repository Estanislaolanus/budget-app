import { useEffect, useState, useRef, RefObject } from 'react';
import { DropdownProps } from '../../Types';
import getCategory from '../../utils/getCategoryInfo'
import './Dropdown.css';

export default function Dropdown({ category: cat, setCategory }: Readonly<DropdownProps>) {
    const [select, setSelect] = useState<boolean>(false);
    const [textField, setTextField] = useState<string>("");
    const dropdownRef: RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (!cat) setTextField("Choose a category");
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
            <button onClick={() => setSelect(!select)} className="select">
                <span>{textField || "Choose a category"}</span>
                <div className={`caret ${select ? "caret-rotate" : ""}`}>
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                        <g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z" /> </g>

                    </svg>
                </div>
            </button>
            <ul className={`menu ${select ? "menu-open" : ""}`}>
                <li>
                    <button onClick={() => onSelect("groceries")}>
                        <img src="./assets/categories/grocery.png" alt="" />
                        <div className="list-title">Groceries</div>
                    </button>
                </li>
                <li>
                    <button onClick={() => onSelect("entertainment")}>
                        <img src="./assets/categories/entertainment.png" alt="" />
                        <div className="list-title">Entertainment</div>
                    </button>

                </li>
                <li>
                    <button onClick={() => onSelect("taxes")}>
                        <img src="./assets/categories/tax.png" alt="" />
                        <div className="list-title">Taxes</div>
                    </button>
                </li>
                <li>
                    <button onClick={() => onSelect("transportation")}>
                        <img src="./assets/categories/transportation.png" alt="" />
                        <div className="list-title">Transportation</div>
                    </button>
                </li>
                <li>
                    <button onClick={() => onSelect("education")}>
                        <img src="./assets/categories/education.png" alt="" />
                        <div className="list-title">Education</div>
                    </button>
                </li>
                <li>
                    <button onClick={() => onSelect("housing")}>
                        <img src="./assets/categories/housing.png" alt="" />
                        <div className="list-title">Housing</div>
                    </button>
                </li>
                <li>
                    <button onClick={() => onSelect("personalCare")}>
                        <img src="./assets/categories/personal-care.png" alt="" />
                        <div className="list-title">Personal Care</div>
                    </button>
                </li>
                <li>
                    <button onClick={() => onSelect("insurance")}>
                        <img src="./assets/categories/insurance.png" alt="" />
                        <div className="list-title">Insurance</div>
                    </button>
                </li>
                <li>
                    <button onClick={() => onSelect("debtPayents")}>
                        <img src="./assets/categories/debt.png" alt="" />
                        <div className="list-title">Debt Payents</div>
                    </button>
                </li>
                <li>
                    <button onClick={() => onSelect("other")}>
                        <div className="list-title">Other</div>
                    </button>
                </li>
            </ul>
        </div>
    )
}
