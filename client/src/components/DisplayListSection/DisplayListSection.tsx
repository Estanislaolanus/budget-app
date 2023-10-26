import { DisplayListSectionProps } from '../../Types';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown'
import {categories} from '../../utils/constants';
export default function DisplayListSection({amountArray, ...rest}: DisplayListSectionProps){
    return (
        <>
            {
                amountArray.length && amountArray[0].type === "budget" ? <CategoryDropdown amountArray={amountArray} {...rest}/> :
                categories.map((category, i) => {
                    const categoryArray = amountArray.filter(a => a.category === category);
                    if(categoryArray.length === 0) return <></>;
                    return <CategoryDropdown key={`${i}-${category}`} amountArray={categoryArray} {...rest}/>;
                })
            }
        </>
    )
}