import { ReactNode, createContext, useContext, useState } from "react";
import { initialSideParmas, sideHistoryStoreType, sideHistoryType } from "./type";


export const sideHistoryContext = createContext<sideHistoryStoreType>(initialSideParmas);
const SideHistoryProvider = ({ children }: { children: ReactNode }) => {
    const [sideHistory, setSideHistory] = useState<sideHistoryType>([])
    return (
        <sideHistoryContext.Provider value={{ sideHistory, setSideHistory }}>
            {children}
        </sideHistoryContext.Provider>
    )
}

const useSideHistory = () => ({
    sideHistory: useContext(sideHistoryContext).sideHistory,
    setSideHistory: useContext(sideHistoryContext).setSideHistory
})
export default SideHistoryProvider;
export { useSideHistory };
