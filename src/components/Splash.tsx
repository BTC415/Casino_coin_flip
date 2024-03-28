import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useLoaded } from "../store/store";
import { VITE_API_ASSETS_IMAGE_URL } from "../utils/urls";
import { LoadingPIXIApp, LoadingPIXIAppStage, PIXI } from "../render/renderer";
import { Game_Global_Vars } from "../config";

const Splash = ({ setShowSplash }: {
    setShowSplash: Dispatch<SetStateAction<boolean>>
}) => {
    const { loaded } = useLoaded()
    const ref = useRef<HTMLDivElement>(null)
    const loading_bar_anim_sprite = useRef<PIXI.AnimatedSprite | null>(null)

    useEffect(() => {
        Game_Global_Vars.onLoadProgressChange = (p: number) => {
            loading_bar_anim_sprite.current?.gotoAndStop(Math.ceil(p * 12))
        }
        if (!ref.current) return
        ref.current.innerHTML = ""
        ref.current.appendChild(LoadingPIXIApp.view)

        PIXI.Assets.load(`${VITE_API_ASSETS_IMAGE_URL}sprites/loading-bar-anim.json`).then(() => {
            const bgLoadingBar = new PIXI.Sprite(PIXI.Texture.from(`loading-bar-anim-0.png`))
            const loading_bar_anim_frames = [];
            for (let i = 1; i <= 13; i++) {
                loading_bar_anim_frames.push(PIXI.Texture.from(`loading-bar-anim-${i}.png`));
            }

            loading_bar_anim_sprite.current = new PIXI.AnimatedSprite(loading_bar_anim_frames);

            LoadingPIXIAppStage.addChild(bgLoadingBar)
            LoadingPIXIAppStage.addChild(loading_bar_anim_sprite.current)
        })

    }, [])
    return (
        <div className='w-full h-full absolute top-0 flex flex-col justify-center items-center gap-4'>
            <img className='w-6/12 max-w-[400px] mx-auto ' src={`${VITE_API_ASSETS_IMAGE_URL}title.png`} />
            <div className="flex flex-col justify-center items-center">
                <span className='text-lg uppercase'>Loading...</span>
                <div ref={ref} className="w-[300px] h-[50px]"></div>
            </div>
            {
                loaded &&
                <div className='w-full h-full min-h-screen flex flex-col justify-center items-center gap-10 bg-black/40 absolute'>
                    <div className='relative w-full max-w-[800px]'>
                        <img className=' mx-auto ' src={`${VITE_API_ASSETS_IMAGE_URL}popup.png`} />
                        <div className='absolute w-full h-full top-0 flex flex-col gap-[30%] justify-center items-center'>
                            <span className='text-lg tb:text-3xl w-full text-center text-[#188CC8]'>Toss the coin in round and win x100!</span>
                            <button onClick={() => setShowSplash(false)} className='w-1/4 mx-auto'><img className='w-full' src={`${VITE_API_ASSETS_IMAGE_URL}btn-start.png`} /></button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Splash