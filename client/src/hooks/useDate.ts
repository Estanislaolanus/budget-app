import { useContext } from 'react'
import { DateContext } from '../context/DateProvider';

const useDate = () => {
    return useContext(DateContext)
}

export default useDate;