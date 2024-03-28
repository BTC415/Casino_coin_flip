import { Dispatch, SetStateAction } from "react"

export type gameParamsType = {
    balance: number;
    bet_val: string;
    bet_toss: number;
    win: string;
    auto_fiip_val: number;
}
export type storeType = {
    gameParams: gameParamsType,
    setGameParams: Dispatch<SetStateAction<gameParamsType>>,
    isFullScreen: boolean,
    setFullScreen: Dispatch<SetStateAction<boolean>>,
    loaded: boolean,
    setLoaded: Dispatch<SetStateAction<boolean>>,
    childContent: JSX.Element,
    setChildContent: Dispatch<SetStateAction<JSX.Element>>,
}

export const initialPrams: gameParamsType = {
    balance: 0,
    bet_val: "1",
    bet_toss: 0,
    win: "",
    auto_fiip_val: 0,
}
export const initialValue: storeType = {
    gameParams: initialPrams,
    setGameParams: () => { },
    isFullScreen: false,
    setFullScreen: () => { },
    loaded: false,
    setLoaded: () => { },
    childContent: <></>,
    setChildContent: () => { },
}

export type sideHistoryType = {
    bet_toss: number,
    bet: number,
    profit: number
}[]
export type sideHistoryStoreType = {
    sideHistory: sideHistoryType,
    setSideHistory: Dispatch<SetStateAction<sideHistoryType>>
}
export const initialSideParmas: sideHistoryStoreType = {
    sideHistory: [],
    setSideHistory: () => { }
}