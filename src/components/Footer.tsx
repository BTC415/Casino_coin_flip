import { ChangeEvent, ReactNode, useEffect, useState } from "react"
import { Game_Global_Vars } from "../config"
import { VITE_API_ASSETS_IMAGE_URL } from "../utils/urls"
import axios from "axios"
import { TIMESCALE, playSound, showToast } from "../utils"
import { useChildContent, useGameParams } from "../store/store"
import { useSideHistory } from "../store/sideHistory"
import { sideHistoryType } from "../store/type"
import RuleDialog from "./dialog/RuleDialog"
import AutoFlipDialog from "./dialog/AutoFlipDialog"

const ImgButton = ({ className, src, onClick }: { className: string, src: string, onClick?: () => void }) => {
    return (
        <button onClick={onClick} className={`${className} absolute top-1/2 hover:opacity-80`}><img src={`${src}`} /></button>
    )
}
const SwingWrapper = ({ bottom, children }: { bottom: number, children: ReactNode }) => {
    const [scale, setScale] = useState(1)
    const handleResize = () => {
        setScale(window.innerWidth / 1920)
    }
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <div className={`absolute origin-bottom-left left-0 w-0 h-0 bottom-0 pl-[0px] z-30 px`} style={{ textShadow: "2px 2px black", scale: `${scale} ${scale}`, paddingBottom: bottom }}>
            {children}
        </div>
    )
}
const AutoFlipItemButton = ({ item, handleFlip, handleClose }: { item: number, handleFlip: () => Promise<void>, handleClose: () => void }) => {
    const { setGameParams } = useGameParams()
    const handleClick = () => {
        Game_Global_Vars.auto_flip_val = item
        setGameParams(v => ({ ...v, auto_fiip_val: item }))
        handleFlip()
        handleClose()
    }
    return <button onClick={handleClick} className="flex justify-center items-center w-20 h-16 bg-[#3c3c3c] hover:opacity-60">{item > 0 ? item : "∞"}</button>
}
const Footer = () => {
    const { gameParams, setGameParams } = useGameParams()
    const [showAutoflipModal, setShowAutoFlipModal] = useState(false)
    const { setChildContent } = useChildContent()
    const { setSideHistory } = useSideHistory()

    const [landscape, setLandscape] = useState(true)
    const handleResize = () => {
        setLandscape(window.innerWidth >= window.innerHeight)
    };
    useEffect(() => {
        Game_Global_Vars.onComplete = onComplete
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (Game_Global_Vars.auto_flip_val > 0) return
        // const bet_val = (/\d+\.\d{3,}/.test(e.target.value)) ? parseFloat(e.target.value).toFixed(2) : e.target.value
        if (!/^\d+$/.test(e.target.value) && e.target.value) return

        setGameParams(v => ({ ...v, bet_val: e.target.value }))
    }
    const handleFlip = async () => {

        if (Game_Global_Vars.running) return
        playSound("flip")
        const bet_val = parseFloat(gameParams.bet_val)
        if (bet_val < Game_Global_Vars.stake.min) {
            showToast(`Bet amount is less than min stake amount ${Game_Global_Vars.stake.min}!`)
            setGameParams(v => ({ ...v, auto_fiip_val: 0 }))
            Game_Global_Vars.auto_flip_val = 0
            return
        }
        if (bet_val > Game_Global_Vars.stake.max) {
            showToast(`Bet amount exceeds max stake amount ${Game_Global_Vars.stake.max}!`)
            setGameParams(v => ({ ...v, auto_fiip_val: 0 }))
            Game_Global_Vars.auto_flip_val = 0
            return
        }

        Game_Global_Vars.running = true

        setGameParams(v => ({
            ...v,
            win: "",
            balance: v.balance - parseFloat(gameParams.bet_val),
        }))


        try {
            let hash = Game_Global_Vars.pf_hash
            let { data: { status, message } } = await axios.post('/api/games/heads-or-tails/play/verify', {
                "hash": hash,
                "bet": parseFloat(gameParams.bet_val),
                "toss_bet": gameParams.bet_toss,
            })
            if (!status) {
                const { data: { hash: _hash } } = await axios.post('/api/user/games/create', {
                    game_package_id: "heads-or-tails",
                    client_seed: Math.ceil(Math.random() * 99999999)
                })
                const { data: { status: _status, message: _message } } = await axios.post('/api/games/heads-or-tails/play/verify', {
                    "hash": _hash,
                    "bet": parseFloat(gameParams.bet_val),
                    "toss_bet": gameParams.bet_toss,
                })
                status = _status
                message = _message
                hash = _hash
            }
            if (!status) {
                showToast(message)
                Game_Global_Vars.running = false;
                setGameParams(v => ({ ...v, auto_fiip_val: 0 }))
                Game_Global_Vars.wonRes = null;
                return
            } else {
                // setBalance(v => v - game_global_vars.betVal)
            }
            const { data: wonRes } = await axios.post('/api/games/heads-or-tails/play', {
                "hash": hash,
                "bet": 100,
                "toss_bet": 0,
                "theme_type": "Modern"
            })
            Game_Global_Vars.wonRes = wonRes
            Game_Global_Vars.pf_hash = wonRes.pf_game.hash
            console.log(wonRes)
            const spineCoin = Game_Global_Vars.spineCoin
            if (spineCoin) {
                spineCoin.state.timeScale = TIMESCALE
                spineCoin.state.setAnimation(0, `${Game_Global_Vars.prev_toss === 0 ? "H" : "T"}${wonRes.gameable.toss_result===0 ? "H" : "T"}`, false);
                Game_Global_Vars.prev_toss = wonRes.gameable.toss_result
            }

        } catch (error) {
            showToast('Oops! Please try again.')
            Game_Global_Vars.running = false;
            Game_Global_Vars.wonRes = null;
        }
    }
    const onComplete = () => {
        Game_Global_Vars.running = false
        setSideHistory(v => {
            const new_v: sideHistoryType = [...v, { bet: parseFloat(gameParams.bet_val), bet_toss: gameParams.bet_toss, profit: Game_Global_Vars.wonRes.profit }]
            return new_v.slice(-6)
        })
        if (Game_Global_Vars.wonRes.win > 0) {
            playSound('win')
        }

        Game_Global_Vars.auto_flip_val = Game_Global_Vars.auto_flip_val > 0 ? Game_Global_Vars.auto_flip_val - 1 : Game_Global_Vars.auto_flip_val
        setGameParams(v => {
            const val = v.auto_fiip_val > 0 ?
                (v.auto_fiip_val - 1) : v.auto_fiip_val
            return {
                ...v,
                balance: Game_Global_Vars.wonRes.account.balance,
                win: `${Game_Global_Vars.wonRes.win}`,
                auto_fiip_val: val
            }
        })

        if (Game_Global_Vars.auto_flip_val > 0 || Game_Global_Vars.auto_flip_val === -1) {
            setTimeout(handleFlip, 500);
        }

    }
    return (
        <div className="w-full bg-blue-700 relative">
            <img className={`w-full ${landscape ? "" : "hidden"}`} src={`${VITE_API_ASSETS_IMAGE_URL}bg-footer.png`} />
            <img className={`w-full ${landscape ? "hidden" : ""}`} src={`${VITE_API_ASSETS_IMAGE_URL}bg-footer-mobile.png`} />
            <ImgButton onClick={() => {
                setChildContent(<RuleDialog />)
            }} className={`${landscape ? "w-[3%] -translate-y-[50%]" : "w-[8%] translate-y-[20%]"} left-[4%]`} src={`${VITE_API_ASSETS_IMAGE_URL}btn-info.png`} />
            <ImgButton onClick={() => {
                if (Game_Global_Vars.auto_flip_val > 0) return
                setGameParams(v => ({ ...v, bet_val: `${Game_Global_Vars.stake.min}` }))
            }} className={`${landscape ? "w-[6%] left-[10%] -translate-y-[50%]" : "w-[14%] left-[3%] -translate-y-[145%]"}`} src={`${VITE_API_ASSETS_IMAGE_URL}btn-min.png`} />
            <ImgButton onClick={() => {
                if (Game_Global_Vars.auto_flip_val > 0) return
                setGameParams(v => ({ ...v, bet_val: `${Math.max(Game_Global_Vars.stake.min, parseFloat(gameParams.bet_val) - 100)}` }))
            }} className={`${landscape ? "w-[3.5%] left-[20%] -translate-y-[60%]" : "w-[8%] left-[25%] -translate-y-[215%]"}`} src={`${VITE_API_ASSETS_IMAGE_URL}btn-minus.png`} />
            <ImgButton onClick={() => {
                if (Game_Global_Vars.auto_flip_val > 0) return
                setGameParams(v => ({ ...v, bet_val: `${Math.min(Game_Global_Vars.stake.max, parseFloat(gameParams.bet_val) + 100)}` }))
            }} className={`${landscape ? "w-[3.5%] left-[32%] -translate-y-[60%]" : "w-[8%] left-[53%] -translate-y-[215%]"}`} src={`${VITE_API_ASSETS_IMAGE_URL}btn-plus.png`} />
            <ImgButton onClick={() => {
                if (Game_Global_Vars.auto_flip_val > 0) return
                setGameParams(v => ({ ...v, bet_val: `${Game_Global_Vars.stake.max}` }))
            }} className={`${landscape ? "w-[6%] left-[40%] -translate-y-[50%]" : "w-[14%] left-[70%] -translate-y-[145%]"}`} src={`${VITE_API_ASSETS_IMAGE_URL}btn-max.png`} />
            <ImgButton onClick={handleFlip} className={`${landscape ? "w-[8%] left-[82%] -translate-y-[50%]" : "w-[19%] left-[76%] -translate-y-[15%]"}`} src={`${VITE_API_ASSETS_IMAGE_URL}btn-flip.png`} />
            <ImgButton onClick={() => {

                if (gameParams.auto_fiip_val === 0) {
                    if (Game_Global_Vars.running) return
                    if (window.innerWidth < 576) {
                        setChildContent(<AutoFlipDialog handleFlip={handleFlip} />)
                    } else {
                        setShowAutoFlipModal(v => !v)
                    }
                } else {
                    setGameParams(v => ({ ...v, auto_fiip_val: 0 }))
                    Game_Global_Vars.auto_flip_val = 0
                }




            }} className={`${landscape ? "w-[6%] left-[92%] -translate-y-[45%]" : "w-[10%] left-[88%] -translate-y-[183%]"}`} src={`${VITE_API_ASSETS_IMAGE_URL}${(gameParams.auto_fiip_val > 0 || gameParams.auto_fiip_val === -1) ? "btn-auto-stop" : "btn-auto"}.png`} />
            <div className={`absolute ${landscape ? "" : "hidden"}`}>
                <SwingWrapper bottom={100}>
                    <input value={gameParams.bet_val} disabled={gameParams.auto_fiip_val !== 0} onChange={handleChange} onBlur={(e) => {
                        if (e.target.value.trim() === "") {
                            setGameParams(v => ({ ...v, bet_val: "100" }))
                        }
                    }} className='outline-none ml-[450px] bg-transparent w-[160px] text-[36px] leading-[30px] text-center text-white disabled:text-white/70' size={10} />
                </SwingWrapper>
                <SwingWrapper bottom={90}>
                    <p className='ml-[1140px] bg-transparent text-[52px] w-[220px] leading-[30px] text-center text-white select-none'>{gameParams.win}</p>
                </SwingWrapper>
                <SwingWrapper bottom={170}>
                    <p className='ml-[1710px] bg-transparent text-[32px] w-[220px] leading-[30px] text-center text-white select-none'>{(gameParams.auto_fiip_val > 0) ? gameParams.auto_fiip_val : gameParams.auto_fiip_val === -1 ? "∞" : ""}</p>
                </SwingWrapper>
                <SwingWrapper bottom={420}>
                    <div onClick={() => setShowAutoFlipModal(false)} style={{ scale: showAutoflipModal ? "1" : "0" }} className="fixed -left-[500vw] bottom-[160px] w-[1000vw] h-[1000vh]"></div>
                    <div className='ml-[1410px] flex flex-col gap-2 rounded-md text-[32px] w-[520px] leading-[30px] px-8 py-4 bg-[#2c2c2c] text-white select-none origin-bottom-right transition-all ease-in-out duration-500 z-[100]' style={{ scale: showAutoflipModal ? "1" : "0" }}>
                        <p>Autoflip settings</p>
                        <small>Number of Rounds</small>
                        <div className="flex justify-center flex-wrap items-center gap-2 text-[18px]">
                            {[10, 25, 50, 100, 250, 500, 750, 1000, -1].map((item, i) => <AutoFlipItemButton key={i} item={item} handleFlip={handleFlip} handleClose={() => setShowAutoFlipModal(false)} />)}
                        </div>
                    </div>
                </SwingWrapper>
            </div>
            <div className={`absolute ${landscape ? "hidden" : ""}`}>{/* Mobile */}
                <SwingWrapper bottom={770}>
                    <input value={gameParams.bet_val} disabled={gameParams.auto_fiip_val !== 0} onChange={handleChange} onBlur={(e) => {
                        if (e.target.value.trim() === "") {
                            setGameParams(v => ({ ...v, bet_val: "100" }))
                        }
                    }} className='outline-none ml-[635px] bg-transparent text-[60px] leading-[30px] text-center text-white disabled:text-white/70' size={10} />
                </SwingWrapper>
                <SwingWrapper bottom={380}>
                    <p className='ml-[640px] bg-transparent text-[90px] w-[400px] leading-[90px] text-center text-white select-none'>{gameParams.win}</p>
                </SwingWrapper>
                <SwingWrapper bottom={920}>
                    <p className='ml-[1675px] bg-transparent text-[72px] w-[220px] leading-[30px] text-center text-white select-none'>{(gameParams.auto_fiip_val > 0) ? gameParams.auto_fiip_val : gameParams.auto_fiip_val === -1 ? "∞" : ""}</p>
                </SwingWrapper>
            </div>
        </div>
    )
}
export default Footer