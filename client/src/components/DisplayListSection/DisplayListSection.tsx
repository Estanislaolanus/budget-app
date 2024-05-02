import { DisplayListSectionProps } from '../../Types';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown'
import { categories } from '../../utils/constants';
export default function DisplayListSection({ typeOfTransaction, incomeArray, expenseArray, ...rest }: Readonly<DisplayListSectionProps>) {
    return (
        <>
            {
                typeOfTransaction === "expense" ?
                    categories.map((category, i) => {
                        const categoryArray = expenseArray.filter(e => e.category === category);
                        if (categoryArray.length === 0) return null;
                        return <CategoryDropdown key={`${i}-${category}`} typeOfTransaction={typeOfTransaction} incomeArray={incomeArray} expenseArray={categoryArray} {...rest} />;
                    })
                    :
                    incomeArray.length === 0 ? <></> : <CategoryDropdown typeOfTransaction={typeOfTransaction} incomeArray={incomeArray} expenseArray={expenseArray} {...rest} />

            }
        </>
    )
}