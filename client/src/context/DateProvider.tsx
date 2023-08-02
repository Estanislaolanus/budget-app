import { createContext, useState } from "react";
import { ContextProviderProps, DateContext as dateContext} from "../Types";

export const DateContext = createContext<dateContext | undefined>(undefined);

export const DateProvider = ({ children }: ContextProviderProps) => {
    const currentDate = new Date();
    const [date, setDate] = useState<Date>(currentDate);
    return (
        <DateContext.Provider value={{ date, setDate }}>
            {children}
        </DateContext.Provider>
    )
}