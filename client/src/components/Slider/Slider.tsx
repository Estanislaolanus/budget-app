import { useState } from 'react';
import { SliderProps } from '../../Types';
import DisplayBudget from '../DisplayBudget/DisplayBudget';
import UserDisplay from '../UserDisplay/UserDisplay';
import "./Slider.css";
import PieChart from '../PieChart/PieChart';
export default function Slider(props: SliderProps) {
    const [currIndex, setCurrIndex] = useState<number>(0);
    const slides = [
        <DisplayBudget {...props}/>,
        <PieChart {...props}/>
    ]
    function next () {
        const isLastIndex = currIndex === slides.length - 1 ;
        const slide = isLastIndex ? 0 : currIndex + 1;
        setCurrIndex(slide);
    }
    function prev () {
        const isFirstIndex = currIndex ===  0;
        const slide = isFirstIndex ? slides.length - 1 : currIndex - 1;
        setCurrIndex(slide);
    }
    return (
        <>
            <UserDisplay/>
            <div className='slider-container'>
                <div className="slider">
                    <button onClick={() => prev()} className='slider-button prev'>&#10092;</button>
                    <button onClick={() => next()} className='slider-button next'>&#10093;</button>
                    {slides[currIndex]}
                </div>
            </div>
        </>
    )
}
