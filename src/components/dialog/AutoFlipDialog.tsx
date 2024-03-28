import { Game_Global_Vars } from "../../config";
import { useChildContent, useGameParams } from "../../store/store";
import { VITE_API_ASSETS_IMAGE_URL } from "../../utils/urls";
import PageWrapper from "../PageWrapper";
export default function AutoFlipDialog({ handleFlip }: { handleFlip: () => Promise<void> }) {
    const { setChildContent } = useChildContent()
    const { setGameParams } = useGameParams()
    const handleClose = () => {
        setChildContent(<></>)
    }
    return (
        <PageWrapper>
            <div className="w-full h-full overflow-y-auto max-h-screen min-h-screen bg-[#212121]">
                <img onClick={handleClose} className="w-10 h-10 fixed top-10 right-10 cursor-pointer" src={`${VITE_API_ASSETS_IMAGE_URL}button-close.png`} />
                <div className="flex flex-col gap-4 justify-center items-center text-white h-full min-h-screen" style={{ fontFamily: "Roboto" }}>
                    <h1 className="text-2xl">Autoflip Settings</h1>
                    <h4 className="text-[#888]">Number of rounds</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-[200px] place-items-center cursor-pointer">
                        {[10, 25, 50, 75, 100, 125, 200, -1].map((item, i) => (
                            <div key={i} onClick={() => {
                                Game_Global_Vars.auto_flip_val = item
                                setGameParams(v => ({ ...v, auto_fiip_val: item }))
                                handleFlip()
                                handleClose()
                            }} className="p-8 border border-[#888] text-center w-full bg-black">
                                <h1 className="text-xl" style={{ fontFamily: "Roboto" }}>{item > 0 ? item : "∞"}</h1>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}