/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import './App.css'
import Splash from "./components/Splash"
import Game from "./components/Game"
import { PIXI } from "./render/renderer"
import { VITE_API_ASSETS_IMAGE_URL, getAssetUrls } from "./utils/urls"
import Init from "./render/Init"
import { useChildContent, useLoaded } from "./store/store"
import FullscreenButton from "./components/FullscreenButton"
import { Game_Global_Vars } from "./config"

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const { setLoaded } = useLoaded()
  const { childContent } = useChildContent()
  useEffect(() => {
    PIXI.Assets.add({ alias: 'spine', src: `${VITE_API_ASSETS_IMAGE_URL}sprites/coin.json` });
    PIXI.Assets.load(getAssetUrls(), (progress) => {
      // loadingSprite?.gotoAndStop(Math.min(Math.floor(progress * 33), 32))
      if (Game_Global_Vars.onLoadProgressChange)
        Game_Global_Vars.onLoadProgressChange(progress * 0.5)
    }).then(() => {
      PIXI.Assets.load(['spine'], (progress: number) => {
        if (Game_Global_Vars.onLoadProgressChange)
          Game_Global_Vars.onLoadProgressChange(0.5 + progress * 0.5)
      }).then((res: any) => {
        setLoaded(true)
        Init(res)
      });
    })
  }, [])
  return (
    <div className='relative w-full h-full min-h-screen overflow-hidden bg-cover text-white font-fran' style={{ backgroundImage: `url(${VITE_API_ASSETS_IMAGE_URL}bg.png)` }}>
      {
        showSplash &&
        <Splash setShowSplash={setShowSplash} />
      }
      <Game show={!showSplash} />
      <FullscreenButton />
      <div className="w-full absolute top-0 z-30">
        {childContent}
      </div>
    </div>
  )
}

export default App
