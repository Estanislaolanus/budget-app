import { createContext, useState } from "react";
import { AuthProviderProps, UserContext } from "../Types";

export const AuthContext = createContext<UserContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<Boolean>(false);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


