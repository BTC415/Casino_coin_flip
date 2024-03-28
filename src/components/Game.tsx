import { useEffect, useRef, useState } from "react"
import Footer from "./Footer"
import PixiComponent from "./PixiComponent"
import SideHistory, { HeadOrTail, SideHistoryList } from "./SideHistory"
import SideHistoryProvider from "../store/sideHistory"
import { checkDevice, interpolate } from "../utils"
import { useFullScreen } from "../store/store"
import { VITE_API_ASSETS_IMAGE_URL } from "../utils/urls"

const Game = ({ show }: { show: boolean }) => {
    const { setFullScreen } = useFullScreen()
    const parentRef = useRef<HTMLDivElement>(null)
    const siblingRef = useRef<HTMLDivElement>(null)
    const ref = useRef<HTMLDivElement>(null)
    const [wRate, setWRate] = useState(50)
    const [wPro, setWPro] = useState(70)
    const [landscape, setLandscape] = useState(true)
    const handleResize = () => {
        setLandscape(window.innerWidth >= window.innerHeight)
        // if (mobileORdesktop === "desktop") {
        //     setWRate(window.innerWidth < window.innerHeight ? 100 : (interpolate(window.innerWidth, 780, 1024, 50, 70)))
        // } else
        {
            setWRate(window.innerWidth < window.innerHeight ? 100 : (100 - 100 * (parentRef.current?.clientHeight || 1000) / window.innerWidth) * 1.05)
            setWPro(interpolate(window.innerWidth, 400, 800, 70, 50))
        }
        // setTimeout(() => {
        if (ref.current && parentRef.current && siblingRef.current)
            ref.current.style.setProperty("height", `${parentRef.current.clientHeight - siblingRef.current.clientHeight}px`)
        // }, 100);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const { iPhone } = checkDevice()
        if (show && !iPhone)
            setFullScreen(true)
    }, [show])
    return (
        <SideHistoryProvider>
            <div className={`${show ? "" : "hidden"}`} >
                <div className="w-full h-screen min-h-screen flex flex-col items-center" style={{ paddingTop: window.innerWidth > 1024 ? 62 : 38 }}>
                    <div ref={parentRef} className={`w-full h-full flex ${landscape ? "flex-row" : "flex-col"} justify-center items-center gap-4 overflow-hidden bg-cover`}  style={{ backgroundImage: `url(${VITE_API_ASSETS_IMAGE_URL}bg.png)` }}>
                        <div ref={ref} className=" h-full " style={{ width: `${wRate}%` }}>
                            <PixiComponent show={show} />
                        </div>
                        <SideHistory wRate={wRate} />
                        <div ref={siblingRef} className={`${landscape ? "hidden" : ""} w-full flex justify-center max-h-[ 190px]`}><HeadOrTail landscape={landscape} wPro={wPro} /></div>
                    </div>
                    <Footer />
                </div>
                <div className={`${landscape ? "hidden" : ""} w-full p-4 bg-[#021540]`}>
                    <div className="w-full flex justify-between items-center px-2 pb-4 text-[#03C0FC]">
                        <span>Game</span>
                        <span>Bet</span>
                        <span>Profit</span>
                        <span>Info</span>
                    </div>
                    <SideHistoryList mobile />
                </div>
            </div>
        </SideHistoryProvider>
    )
}
export default Game