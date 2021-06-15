import {createContext, useContext, useState, ReactNode, useEffect, useMemo} from "react";
import {IUser} from "../types/IUser";
import {destroyCookie} from 'nookies'


type UserContextType = {
    user: IUser | null;
    setUser: (value: IUser | null) => void;
};
export const UserContext = createContext<UserContextType | undefined>({
    user: null, setUser: null
});

type Props = {
    children: ReactNode;
};

export const UserProvider = ({children}: Props) => {
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        checkAuth()
    }, [])


    const checkAuth = () => {
        const localUserString = window.localStorage.getItem("current_user");
        if (localUserString != null && localUserString !== "null" && localUserString !== "undefined") {
            const localUser = JSON.parse(localUserString);
            setUser(localUser);
        } else {
            setUser(null);
            destroyCookie(null, 'access_token', {path: '', domain: process.env.NEXT_PUBLIC_APP_DOMAIN})
            window.localStorage.removeItem("current_user");
        }
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);
