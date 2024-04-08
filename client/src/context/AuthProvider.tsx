import { createContext, useState } from "react";
import { ContextProviderProps, AuthContext as authContext } from "../Types";

export const AuthContext = createContext<authContext | undefined>(undefined);

export const AuthProvider = ({ children }: ContextProviderProps) => {
    const [auth, setAuth] = useState<boolean>(false);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


