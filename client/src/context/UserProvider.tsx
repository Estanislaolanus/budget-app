import { createContext, useState } from "react";
import { ContextProviderProps, User, UserContext as userContext } from "../Types";

export const UserContext = createContext<userContext | undefined>(undefined);

export const UserProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<User>({ username: "", email: "", isEmailVerified: false });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}