import './DisplayDate.css';
import {useEffect, useState} from 'react'
import useMonth from '../../hooks/useMonth'

export default function DisplayDate() {
    const date = new Date();
    const format = new Intl.DateTimeFormat("en-us", {
        month: "long"
    });
    const [monthName, setMonthName] = useState<String>(format.format(date));
    const month = useMonth()?.month;
    const setMonth = useMonth()?.setMonth;
    useEffect(() => {
        if(!month) return
        const newMonth = new Date(2000, month - 1, 1);
        setMonthName(format.format(newMonth))
    }, [useMonth()?.month]);
    function next () {
        if(!month || !setMonth) return;
        const isLastMonth = month === 12;
        const newMonth = isLastMonth ? 1 : month + 1;
        setMonth(newMonth);
    }
    function prev () {
        if(!month || !setMonth) return;
        const isFirstMonth = month === 1;
        const newMonth = isFirstMonth ? 12 : month - 1;
        setMonth(newMonth);
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
