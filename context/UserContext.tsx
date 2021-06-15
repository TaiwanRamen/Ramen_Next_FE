import {createContext, useContext, useState, ReactNode, useEffect, useMemo} from "react";
import {IUser} from "../types/IUser";
import {destroyCookie} from 'nookies'


type UserContextType = {
    user: IUser | null;
    setUser: any;
};
export const UserContext = createContext<UserContextType | undefined>({
    user: null, setUser: (user: IUser | null) => {}
});

type Props = {
    children: ReactNode;
};

export const UserProvider = ({children}: Props) => {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);
