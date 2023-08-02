import { useState } from 'react';
import { SliderProps } from '../../Types';
import DisplayBudget from '../DisplayBudget/DisplayBudget';
import UserDisplay from '../UserDisplay/UserDisplay';
import "./Slider.css";
import PieChart from '../PieChart/PieChart';
import DisplayDate from '../DisplayDate/DisplayDate';
export default function Slider(props: SliderProps) {
    const [currIndex, setCurrIndex] = useState<number>(0);
    const slides = [
        <DisplayBudget {...props} />,
        <PieChart {...props} />
    ]
    function next() {
        const isLastIndex = currIndex === slides.length - 1;
        const slide = isLastIndex ? 0 : currIndex + 1;
        setCurrIndex(slide);
    }
    function prev() {
        const isFirstIndex = currIndex === 0;
        const slide = isFirstIndex ? slides.length - 1 : currIndex - 1;
        setCurrIndex(slide);
    }
    return (
        <div className='header'>
            <UserDisplay />
            <DisplayDate/>
            <div className='slider-container'>
                <div className="slider">
                    <button onClick={() => prev()} className='slider-button prev-slide'>
                        <svg width="100" height="20" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="m39.582 91.668c-1.1055 0.003906-2.1719-0.42969-2.957-1.2109-0.78906-0.78125-1.2344-1.8477-1.2344-2.957s0.44531-2.1758 1.2344-2.957l34.582-34.543-34.582-34.543c-1.6328-1.6328-1.6328-4.2812 0-5.9141 1.6328-1.6367 4.2812-1.6367 5.918 0l37.5 37.5c0.78906 0.78125 1.2305 1.8477 1.2305 2.957s-0.44141 2.1758-1.2305 2.957l-37.5 37.5c-0.78906 0.78125-1.8516 1.2148-2.9609 1.2109z" />
                        </svg>
                    </button>
                    <button onClick={() => next()} className='slider-button next-slide'>
                    <svg width="100" height="20" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="m39.582 91.668c-1.1055 0.003906-2.1719-0.42969-2.957-1.2109-0.78906-0.78125-1.2344-1.8477-1.2344-2.957s0.44531-2.1758 1.2344-2.957l34.582-34.543-34.582-34.543c-1.6328-1.6328-1.6328-4.2812 0-5.9141 1.6328-1.6367 4.2812-1.6367 5.918 0l37.5 37.5c0.78906 0.78125 1.2305 1.8477 1.2305 2.957s-0.44141 2.1758-1.2305 2.957l-37.5 37.5c-0.78906 0.78125-1.8516 1.2148-2.9609 1.2109z" />
                        </svg>
                    </button>
                    {slides[currIndex]}
                </div>
            </div>
        </div>
    )
}
