
import { useEffect, useState } from "react"
import { Game_Global_Vars } from "../config"
import { useSideHistory } from "../store/sideHistory"
import { useGameParams } from "../store/store"
import { mobileORdesktop } from "../utils"
import { VITE_API_ASSETS_IMAGE_URL } from "../utils/urls"

export const HeadOrTail = ({ landscape, wPro }: { landscape: boolean, wPro?: number }) => {
    const { gameParams, setGameParams } = useGameParams()
    return (
        <div className={`flex ${landscape ? "flex-col" : ""} justify-center items-center h-full px-2 pb-4`} style={{ width: `${wPro || 40}%` }}>
            <div className={`flex flex-col-reverse ${landscape ? "flex-col" : ""} justify-center items-center`}>
                <span>HEAD</span>
                <img onClick={() => {
                    if (Game_Global_Vars.auto_flip_val > 0) return
                    setGameParams(v => ({ ...v, bet_toss: 0 }))
                    const spineCoin = Game_Global_Vars.spineCoin
                    if (spineCoin) {
                        spineCoin.state.timeScale = 0
                        spineCoin.state.setAnimation(0, "HW", false);
                    }
                }} className="w-auto hover:scale-[1.1] transition-all ease-in-out cursor-pointer" style={{ opacity: gameParams.bet_toss === 0 ? 1 : 0.7 }} src={`${VITE_API_ASSETS_IMAGE_URL}coin-head.png`} />
            </div>
            <div className={`flex flex-col-reverse ${landscape ? "flex-col" : ""} justify-center items-center`}>
                <span>TAIL</span>
                <img onClick={() => {
                    if (Game_Global_Vars.auto_flip_val > 0) return
                    setGameParams(v => ({ ...v, bet_toss: 1 }))
                    const spineCoin = Game_Global_Vars.spineCoin
                    if (spineCoin) {
                        spineCoin.state.timeScale = 0
                        spineCoin.state.setAnimation(0, "TW", false);
                    }
                }} className="w-auto hover:scale-[1.1] transition-all ease-in-out cursor-pointer" style={{ opacity: gameParams.bet_toss === 1 ? 1 : 0.7 }} src={`${VITE_API_ASSETS_IMAGE_URL}coin-tail.png`} />
            </div>
        </div>
    )
}
const SideHistoryItem = ({ bet, toss, profit, mobile }: { bet: number, toss: number, profit: number, mobile?: boolean }) => {
    return (
        <div className={`grid grid-cols-12 w-full ${mobileORdesktop === "desktop" ? "p-2" : window.innerHeight > 500 ? "p-2" : ""}  bg-[#022352] rounded-lg`}>
            <div className="w-full h-full flex items-center">
                <img className={`${mobile ? "scale-[1.8]" : "scale-[2.0]"} ${profit > 0 ? "" : "opacity-70"}`} src={`${VITE_API_ASSETS_IMAGE_URL}${toss === 0 ? "bitcoin-small" : "ethereum-small"}.png`} />
            </div>
            <div className="w-full h-full flex items-center col-span-2"><span className="w-full text-center"></span></div>
            <div className="w-full h-full flex items-center col-span-3"><span className="w-full text-center">{bet}</span></div>
            <div className="w-full h-full flex items-center col-span-4"><span className="w-full text-center">{profit.toFixed(2)}</span></div>
            <div className="w-full h-full flex items-center"><img className="" src={`${VITE_API_ASSETS_IMAGE_URL}circle-info.png`} /></div>
        </div>
    )
}
export const SideHistoryList = ({ mobile }: { mobile?: boolean }) => {
    const { sideHistory } = useSideHistory()
    return (
        <div className="pb-5 h-full overflow-auto">
            <div className={`w-full h-full flex flex-col items-center max-lg:text-[8px] ${mobile ? "px-2" : "px-[10%]"} pt-[5%] text-xs ${mobile ? "gap-4" : mobileORdesktop === "desktop" ? "max-2xl:gap-1 gap-6" : window.innerHeight > 500 ? "gap-8" : "gap-2"}`}>
                {sideHistory.map((item, i) => <SideHistoryItem bet={item.bet} toss={item.bet_toss} profit={item.profit} mobile={mobile} key={i} />)}
            </div>
        </div>
    )
}
const SideHistory = ({ wRate }: { wRate: number }) => {
    const [landscape, setLandscape] = useState(true)
    const handleResize = () => {
        setLandscape(window.innerWidth >= window.innerHeight)
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <div className={`${landscape ? "" : "hidden"} h-full flex items-center overflow-hidden relative`} style={{ width: `${100 - wRate}%` }}>
            <div className="w-full h-fit p-4 flex gap-4 justify-center items-center bg-cover bg-no-repeat bg-left" style={{ backgroundImage: `url(${VITE_API_ASSETS_IMAGE_URL}bg-side-coin.png)` }}>
                <HeadOrTail landscape={landscape} />
                <div className="flex flex-col justify-center items-center w-[60%] h-full">
                    <div className="relative">
                        <img className="mx-auto p-4" src={`${VITE_API_ASSETS_IMAGE_URL}bg-side-history.png`} />
                        <div className="absolute top-0 right-0 bottom-0 left-0 p-4 pt-[45%]">
                            <div className="w-full h-full pb-[10%] pt-[5%] overflow-auto">
                                <SideHistoryList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SideHistory