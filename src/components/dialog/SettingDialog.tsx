import { Game_Global_Vars } from "../../config";
import { useChildContent, useGameParams } from "../../store/store";
import { showToast } from "../../utils";
import { VITE_API_ASSETS_IMAGE_URL } from "../../utils/urls";
import PageWrapper from "../PageWrapper";
import * as React from "react"
export default function SettingDialog() {
    const { setChildContent } = useChildContent()
    const { gameParams: { bet_val }, setGameParams } = useGameParams()
    const [bet14, setBet14] = React.useState<string[]>(JSON.parse(localStorage.getItem(`bet14`) || '["100","200","300","400","500","600","700","800","900","1000","1100","1200","1300","1400"]'))
    const curBet14Index = React.useRef<number>(bet14.indexOf(bet_val || "100"))

    return (
        <PageWrapper>
            <div className="w-full h-full max-h-screen min-h-screen bg-[#212121]">
                <img onClick={() => setChildContent(<></>)} className="w-10 h-10 fixed top-[40px] right-10 cursor-pointer" src={`${VITE_API_ASSETS_IMAGE_URL}button-close.png`} />
                <div className="flex flex-col gap-4 justify-center items-center text-white h-full min-h-screen py-5 pb-20" style={{ fontFamily: "Roboto" }}>
                    <h1 className="text-2xl">Chips Settings</h1>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 w-[320px] justify-center items-center">
                        {bet14.map((_, i) =>
                            <ChipItem key={i} id={i} bet14={{ bet14, setBet14 }} />)}

                        <button onClick={() => setChildContent(<></>)} className="w-full px-4 bg-[#787882] rounded-md text-[24px] transition-all ease-in-out hover:bg-[#787882]/80">Cancel</button>
                        <button onClick={() => {
                            if (bet14.some((item) => (parseInt(item) < Game_Global_Vars.stake.min || parseInt(item) > Game_Global_Vars.stake.max))) {
                                showToast(`Bet value should range from ${Game_Global_Vars.stake.min} to ${Game_Global_Vars.stake.max}!`)
                                return
                            }
                            localStorage.setItem('bet14', JSON.stringify(bet14))
                            setGameParams(v => ({ ...v, bet_val: bet14[curBet14Index.current] }))
                            setChildContent(<></>)

                        }} className="w-full px-4 bg-[#FFAE01] rounded-md text-black text-[24px] transition-all ease-in-out hover:bg-[#FFAE01]/80">Save</button>
                    </div>
                </div>
            </div>
        </PageWrapper >
    )
}
const ChipItem = ({ id, bet14: { bet14, setBet14 } }: { id: number, bet14: { bet14: string[], setBet14: React.Dispatch<React.SetStateAction<string[]>> } }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!/^\d+$/.test(e.target.value) && e.target.value) return
        setBet14(prev => {
            const new_var = [...prev]
            const input_value = parseInt(e.target.value || "0")
            const fil_value = Math.min(Game_Global_Vars.stake.max, input_value)
            new_var[id] = fil_value.toString()

            return new_var
        })
    }
    return (
        <div className="flex flex-col gap-[1px] rounded-lg px-2 w-fit py-[2px] border-2 border-white text-center bg-black hover:bg-[#222] transition-all ease-in-out duration-500">
            <h1>Chip Amount</h1>
            <input onChange={handleChange} type="text" value={bet14[id]} className="text-lg bg-transparent w-full text-center focus-within:outline-none" style={{ fontFamily: "Roboto" }} />
        </div>
    )
}