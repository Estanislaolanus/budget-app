import './DisplayDate.css';
import {useEffect, useState} from 'react'
import useDate from '../../hooks/useDate'

export default function DisplayDate() {
    const date = useDate()?.date;
    const setDate = useDate()?.setDate;
    const formatMonthName = new Intl.DateTimeFormat("en-us", {
        month: "long"
    });
    const [monthName, setMonthName] = useState<String>(formatMonthName.format(date));
    useEffect(() => {
        if(!date) return;
        const year = new Date().getFullYear();
        const currentYear = date.getFullYear();
        const isCurrentYear = year === currentYear;
        const month = date.getMonth();
        const newDate = new Date(currentYear, month, 1);
        const getStringDate = isCurrentYear ? formatMonthName.format(newDate) : `${formatMonthName.format(newDate)} ${currentYear}` ;
        setMonthName(getStringDate);
    }, [useDate()?.date]);
    function next () {
        if(!date || !setDate) return;
        const month = date.getMonth();
        const isLastMonth = month === 12;
        const newMonth = isLastMonth ? 1 : month + 1;
        const year = isLastMonth ? date.getFullYear() + 1 : date.getFullYear();
        const newDate = new Date(year, newMonth, 1);
        setDate(newDate);
    }
    function prev () {
        if(!date || !setDate) return;
        const month = date.getMonth();
        const isFirstMonth = month === 1;
        const newMonth = isFirstMonth ? 12 : month - 1;
        const year = isFirstMonth ? date.getFullYear() - 1 : date.getFullYear();
        const newDate = new Date(year, newMonth, 1);
        setDate(newDate);
    }
    return (
        <div className="date-container">
            <div className="date">
                {monthName}
                <svg onClick={() => prev()} className='date-slide-btn prev-date' width="100" height="20" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="m39.582 91.668c-1.1055 0.003906-2.1719-0.42969-2.957-1.2109-0.78906-0.78125-1.2344-1.8477-1.2344-2.957s0.44531-2.1758 1.2344-2.957l34.582-34.543-34.582-34.543c-1.6328-1.6328-1.6328-4.2812 0-5.9141 1.6328-1.6367 4.2812-1.6367 5.918 0l37.5 37.5c0.78906 0.78125 1.2305 1.8477 1.2305 2.957s-0.44141 2.1758-1.2305 2.957l-37.5 37.5c-0.78906 0.78125-1.8516 1.2148-2.9609 1.2109z" />
            </svg>
            <svg onClick={() => next()} className='date-slide-btn next-date' width="100" height="20" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="m39.582 91.668c-1.1055 0.003906-2.1719-0.42969-2.957-1.2109-0.78906-0.78125-1.2344-1.8477-1.2344-2.957s0.44531-2.1758 1.2344-2.957l34.582-34.543-34.582-34.543c-1.6328-1.6328-1.6328-4.2812 0-5.9141 1.6328-1.6367 4.2812-1.6367 5.918 0l37.5 37.5c0.78906 0.78125 1.2305 1.8477 1.2305 2.957s-0.44141 2.1758-1.2305 2.957l-37.5 37.5c-0.78906 0.78125-1.8516 1.2148-2.9609 1.2109z" />
            </svg>
            </div>
        </div>
    )
}
