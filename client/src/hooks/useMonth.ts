import { useContext } from 'react'
import { MonthContext } from '../context/MonthProvider';

const useMonth = () => {
    return useContext(MonthContext)
}

export default useMonth;