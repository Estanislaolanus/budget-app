import { createContext, useState } from "react";
import { ContextProviderProps, MonthContext as monthContext} from "../Types";

export const MonthContext = createContext<monthContext | undefined>(undefined);

export const MonthProvider = ({ children }: ContextProviderProps) => {
    const format = new Intl.DateTimeFormat("en-us", {
        month: "numeric"
    });
    const date = parseInt(format.format(new Date()));
    const [month, setMonth] = useState<number>(date);
    return (
        <MonthContext.Provider value={{ month, setMonth }}>
            {children}
        </MonthContext.Provider>
    )
}