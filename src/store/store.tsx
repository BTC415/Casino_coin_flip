import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { gameParamsType, initialPrams, initialValue, storeType } from "./type";
import axios, { AxiosError } from "axios";
import { Game_Global_Vars } from "../config";
import PageWrapper from "../components/PageWrapper";
import AccessDenied from "../components/AccessDenied";

export const globalContext = createContext<storeType>(initialValue);
const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [isFullScreen, setFullScreen] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [childContent, setChildContent] = useState<JSX.Element>(<></>)
    const [content, setContent] = useState<ReactNode>(<></>);
    const [gameParams, setGameParams] = useState<gameParamsType>(initialPrams)
    const authorize = (loggedIn: boolean) => {
        if (loggedIn) {
            setContent(children);
        } else {
            setContent(
                <PageWrapper><AccessDenied /></PageWrapper>
            );
        }
    };

    useEffect(() => {
        // authorize(true)
        const urlParams = new URLSearchParams(window.location.search);
        const token: string = urlParams.get('token') || "";
        delete axios.defaults.headers.common["Accept"];
        axios.defaults.headers.common['token'] = token;
        axios.defaults.baseURL = import.meta.env.VITE_API_BASE_API_URL;
        axios.defaults.timeout = 20000
        axios.post('/api/config').then((response) => {
            setGameParams(prev => ({
                ...prev,
                balance: response.data.data.user.account.balance,
            }))
            Game_Global_Vars.stake = {
                max: response.data.data.maxStake,
                min: response.data.data.minStake
            }
            authorize(true)
        }).catch(error => {
            if ((error as AxiosError)?.response?.status === 503) {
                document.body.innerHTML = ((error as AxiosError)?.response?.data) as string
                document.body.style.cssText = "color:white"
            }
            authorize(false);
            if (error.response.data.message === "Invalid token!") {
                //!TODO?
            }
        });
        axios.post('/api/user/games/create', {
            game_package_id: "heads-or-tails",
            client_seed: Math.ceil(Math.random() * 99999999)
        }).then(({ data: { hash } }: { data: { hash: string } }) => {
            Game_Global_Vars.pf_hash = hash
        })
    }, []);
    return (
        <globalContext.Provider value={{ gameParams, setGameParams, loaded, setLoaded, isFullScreen, setFullScreen, childContent, setChildContent }}>
            {content}
        </globalContext.Provider>
    )
}

const useGameParams = () => ({
    gameParams: useContext(globalContext).gameParams,
    setGameParams: useContext(globalContext).setGameParams
})
const useFullScreen = () => ({
    isFullScreen: useContext(globalContext).isFullScreen,
    setFullScreen: useContext(globalContext).setFullScreen,
})
const useLoaded = () => ({
    loaded: useContext(globalContext).loaded,
    setLoaded: useContext(globalContext).setLoaded,
})
const useChildContent = () => ({
    childContent: useContext(globalContext).childContent,
    setChildContent: useContext(globalContext).setChildContent,
})
export default StoreProvider;
export { useGameParams, useFullScreen, useLoaded, useChildContent };
