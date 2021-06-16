import {createContext, useContext, useState, ReactNode} from "react";
import {IStore} from "../types/IStore";

type StoreInfo = {
    isStoreOwner: boolean,
    store: IStore
}

type StoreContextType = {
    storeInfo: StoreInfo | null;
    setStoreInfo: any;
};
export const StoreContext = createContext<StoreContextType | undefined>({
    storeInfo: null, setStoreInfo: (storeInfo: StoreInfo | null) => {
    }
});

type Props = {
    children: ReactNode;
};

export const StoreProvider = ({children}: Props) => {
    const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);

    return (
        <StoreContext.Provider value={{storeInfo, setStoreInfo}}>
            {children}
        </StoreContext.Provider>
    );
};
export const useStore = () => useContext(StoreContext);
